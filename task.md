CM2030 Graphics Programming

Coursework 1: Dodgem Arena
Introduction
you will build a Dodgem (bumper‑car) arena using p5.js for
rendering and matter.js for physics. Your task is to create a visually engaging arena
with multiple car types, applying restitution and friction to produce realistic collisions.
You must also develop visual feedback animations.
Task specification
1) Arena & Car Design
•
Draw a rectangular dodgem arena centred on the canvas with a solid, thick
perimeter barrier. The barrier is a hard surface and should have the
appropriate restitution.
Page 2 of 5
•
Use a fixed arena size: 1400 × 700 pixels.
•
Create a Start Zone at the left of side of the arena as seen in the image.
•
Create a car element using matter.js bodies. The player will need to be easily
identifiable. Use a different colour to differentiate it from the other cars.
•
Appearance quality counts: layered drawings, shapes, colours, bumpers,
headlights, etc. Cars may include simple animations reacting to
motion/collisions.
•
Note: The provided image is intended as a guideline only and does not need
to be replicated exactly.
2) Physics (using matter.js)
• The arena barriers and all the cars must be implemented using matter.js
bodies. Both element types must be assigned basic physical properties (e.g.
restitution, friction, etc.). These properties must be set appropriately so as to
produce a simulation that is realistic/reflect a real-world simulation.
• You’ll need to implement two car types with meaningful physical differences:
•
“Standard” cars which behave realistically.
•
“Slow” cars which will appear slower than a standard car (e.g. heavier
and/or slower engine power).
•
You’ll need to implement a force-based acceleration element (throttle).
Cars must be able to accelerate up to a maximum forward and reverse
velocity you set.
•
Use matter.js for all physics and motion.
3) Control & Interaction
Driving: Arrow keys only
•
Up/Down: throttle forward/reverse (force-based acceleration).
•
Left/Right: steering.
Spawn mechanism:
1. Press i to arm.
2. Click inside the Start Zone (Parking Bay on the left side) to insert the player
car.
3. The click must be inside the arena and inside the Start Zone, and the spawn
point must not overlap any existing car.
Opponent car heading policy:
•
Opponent cars should start with an initial heading and motion (see Modes in
Section 4 for details).
Page 3 of 5
•
On barrier contact, an opponent reverses heading (180°) and continues its
path.
•
On car–car contact, the car heading rotates by ±90° for one or both cars, then
the car(s) continue.
•
You may extend or vary this behaviour (e.g. smoother turns or alternative
responses), provided the overall interaction remains clear and consistent.
4) Arena Modes
Keys 1 / 2 / 3 from the keyboard should be used for accessing the different modes.
You’ll be asked to add both the player car and some opponent cars alongside it in
each of those modes. Use a “standard” car for the player and for the four opponents
use two of each type.
The opponent car policy collision response defined previously apply to all modes.
Mode 1 – Practice: This mode starts with four opponent static cars parked in the
Start Zone. Insert the player car into the bay and drive around for practice. The
number of cars should be defined as a global var (i.e. var carNumbers = 4;).
Mode 2 – Random Opponents: Four opponents spawn at random positions (no
overlaps; use separation checks) and with random headings. Opponents follow
straight paths. Player spawns in the Start Zone as above.
Mode 3 – Advanced Opponents: Use the random spawn as in Mode 2, then have the
cars follow automatic trajectories defined as sine‑wave or similar. Cars should
maintain approximately constant speed. Insert the player car and navigate as before
(spawn in the Start Zone; no overlap).
5) Animations
Motion Trail – a subtle speed‑dependent fading trail behind moving cars.
Impact Flash – a brief spark/flash ring at the car–car collision point.
Barrier Pulse – when a car hits the barrier, a localised pulse/ripple/colour shift.
We will expect you to use functions for updating and drawing the animation and we
will also assess the final visual result.
Extension
Since this is a creative module, we would like to give more marks for implementing
further ideas. Also, you should write some words about it in the commentary (see
commentary paragraph). Please note that we will award marks for the uniqueness of
your extension and how technically challenging it appears to have been. Please note
that we will not award any marks if you decide to develop easy extensions such as
scoring. The extension is worth 20% of your mark.
Page 4 of 5
Code quality
Indentation, spacing, OO structure, reusable functions, meaningful variable names,
appropriately scoped variables, avoiding redundant code, sensible approach to
commenting.
Commentary (≤ 500 words)
Included inside the main .js file.
Explain:
1. Physics (physical properties of objects and underlying rationale, throttle
implementation, etc.).
2. Opponent logic in modes 2 and 3.
3. Animation implementation decisions.
4. Any creative extension if attempted and why it is unique/technically interesting
– e.g. scoring alone is not acceptable.