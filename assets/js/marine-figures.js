// Research illustrations use Hairline's shared pointer, spring and visibility engine.
const { clamp, pointer, register, spring, stepS, tour, disposer } = window.HL;
const stops = {
  ocean: [[290, 120], [237, 225], [85, 245], [325, 180], null],
  trawl: [[135, 90], [278, 195], [100, 225], null],
  microscope: [[175, 90], [180, 185], [265, 200], null],
  whale: [[310, 155], [100, 185], [240, 240], null],
  fish: [[183, 182], [282, 142], [115, 111], null],
  dna: [[105, 125], [285, 200], [200, 145], null],
  'dna-water': [[105, 125], [285, 180], [200, 145], null],
  models: [[90, 210], [200, 170], [315, 100], null],
};

export function marineFigure(element, options = {}) {
  const svg = element.querySelector('svg');
  const kind = element.dataset.figure;
  const bag = disposer();
  element.dataset.hairline = kind;
  element.setAttribute('role', 'img');
  if (options.label) element.setAttribute('aria-label', options.label);

  const x = spring(0);
  const y = spring(0);
  const fish = [...svg.querySelectorAll('[data-motion="fish"]')].map(group => ({
    group,
    x: Number(group.dataset.x),
    y: Number(group.dataset.y),
    angle: Number(group.dataset.angle),
    scale: Number(group.dataset.scale),
    range: Number(group.dataset.range || 15),
    lift: spring(0),
  }));
  const whale = svg.querySelector('[data-motion="whale"]');
  const dna = svg.querySelector('[data-motion="dna"]');
  const model = svg.querySelector('[data-motion="model"]');
  const octopus = svg.querySelector('[data-motion="octopus"]');
  const corals = [...svg.querySelectorAll('[data-motion="coral"]')];
  const boat = svg.querySelector('[data-motion="boat"]');
  const net = svg.querySelector('[data-motion="net"]');
  const microscopeStage = svg.querySelector('[data-motion="stage"]');
  const focus = svg.querySelector('[data-motion="focus"]');
  const curve = position => 226 - 0.51 * (position - 65) - 17 * Math.sin((position - 65) / 35);
  let last = '';
  let playing = null;

  function draw() {
    const state = [x.x, y.x, ...fish.map(item => item.lift.x)].join(',');
    if (state === last) return;
    last = state;
    if (whale) {
      whale.setAttribute('transform', `translate(${x.x * 0.045} ${y.x * 0.03}) rotate(${-8 + y.x * 0.035} 200 180)`);
    }
    if (octopus) {
      octopus.setAttribute('transform', `translate(${237 + x.x * 0.025} ${230 + y.x * 0.025}) rotate(${x.x * 0.02}) scale(.72)`);
    }
    for (const coral of corals) {
      coral.setAttribute('transform', `translate(${coral.dataset.x} ${coral.dataset.y}) rotate(${x.x * 0.012}) scale(${coral.dataset.scale || 1})`);
    }
    if (boat) boat.setAttribute('transform', `translate(0 ${y.x * 0.018}) rotate(${x.x * 0.009} 115 103)`);
    if (net) net.setAttribute('transform', `rotate(${x.x * 0.01} 194 165)`);
    if (microscopeStage) microscopeStage.setAttribute('transform', `translate(0 ${y.x * 0.035})`);
    if (focus) focus.setAttribute('transform', `rotate(${x.x * 0.2} 264 196)`);
    for (const item of fish) {
      const rise = item.lift.x;
      item.group.setAttribute('transform', `translate(${item.x + rise * 0.25} ${item.y - rise}) rotate(${item.angle - rise * 0.3}) scale(${item.scale})`);
    }
    if (dna) {
      const phase = x.x * 0.004;
      const top = Number(dna.dataset.top);
      const bottom = Number(dna.dataset.bottom);
      for (const strand of dna.querySelectorAll('[data-strand]')) {
        const side = Number(strand.dataset.strand);
        const points = [];
        for (let position = top; position <= bottom; position += 2) {
          points.push(`${200 + side * 36 * Math.sin((position - top) * Math.PI / 48 + phase)} ${position}`);
        }
        strand.setAttribute('d', `M${points.join(' L')}`);
      }
      for (const rung of dna.querySelectorAll('[data-rung]')) {
        const position = Number(rung.dataset.rung);
        const offset = 36 * Math.sin((position - top) * Math.PI / 48 + phase);
        rung.setAttribute('x1', String(200 - offset));
        rung.setAttribute('x2', String(200 + offset));
      }
    }
    if (model) {
      const position = clamp(200 + x.x, 65, 335);
      model.querySelector('.model-slice').setAttribute('d', `M${position} 93 V249`);
      const point = model.querySelector('.model-point');
      point.setAttribute('cx', String(position));
      point.setAttribute('cy', String(curve(position)));
    }
  }

  const clock = register(element, dt => {
    let moving = stepS(x, dt);
    moving = stepS(y, dt) || moving;
    for (const item of fish) moving = stepS(item.lift, dt) || moving;
    draw();
    return moving;
  });
  bag.add(clock.unregister);
  bag.add(pointer(element, {
    move(position) {
      x.t = clamp(position[0] - 200, -150, 150);
      y.t = clamp(position[1] - 160, -120, 120);
      for (const item of fish) {
        const distance = Math.hypot(position[0] - item.x, position[1] - item.y);
        item.lift.t = item.range * Math.exp(-((distance / 75) ** 2));
      }
      clock.wake();
    },
    leave() {
      x.t = y.t = 0;
      fish.forEach(item => { item.lift.t = 0; });
      clock.wake();
    },
  }));
  bag.add(() => playing?.stop());
  draw();

  function update(next = {}) {
    if (next.play === true && !playing) playing = tour(element, stops[kind]);
    else if (next.play === false && playing) {
      playing.stop();
      playing = null;
    }
  }
  update(options);
  return { update, destroy: bag.dispose };
}
