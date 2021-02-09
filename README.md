# JS-808

#### by DrumNickyDrum

[Click here to play!](https://drumnickydrum-js808.netlify.app/)

## What's next?

Currently there is no resposive design, so this would need to be addressed before this app could be usable. This was just a quick and dirty experiment. I am now developing a full-fledge drum-machine / sequencer using Tone.js. Stay tuned.

## How did I do it?

### Timeline

- 0-2hr (Basic assignment):

  - a wireframe mockup like the example
  - basic css styles
  - the minimum stateful React components neccessary (each instrument's cell grid)
  - the timeline to read the pattern and animate the cells

- 2-2.5hr (css upgrade):

  - mostly for aesthetics

- 2.5-4hr (sound and patterns):
  - To remain sub-4hrs I went with a naive implementation instead of employing tone.js
  - It outputs the beat, although you could never dance to it.

### What were the hard parts?

- Deciding on a data structure for the pattern:

  - 0-indexed array?
  - Map similar to a DAW timeline (1.1, 1.2, 1.3, 1.4, 2.1, 2.2...)

- Tracking down irregularities in timing:
  - It's a side-effect of imprecise javascript timing and React asychronicity. (Moving to Tone.js)

### What were the fun parts?

- I got a little shot of dopamine when the buttons started lighting up.
- Also when I could hear my beat come to life, even if a bit wobbly.
- It's fun to think of all the features I could add (velocity sliding, touch and drag input, global controls)

### Simplicity vs Flexibility

- Adding a `patternLength` state to the brain component should be seamless since the cells are rendered dynamically based on the pattern.
  - The clock is hardcoded at 16 right now, but switching that to `patternLength` would fix it.
  - Would need to address responsive design / scrolling to adjust for long patterns
- Velocity is set via 2-step clicks (1 for full, 2 for half).
  - I think I got this idea from the original 808.
  - This could be changed to a popup modal with a slider to set the value between 0 and 1 for more granularity.

### Is the code tested?

- No, but I've extracted it into small units and functions. I would write tests before expanding this app further.
