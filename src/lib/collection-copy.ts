/* Editorial copy for the collection pages — what the piece is, why it
   belongs in a house, and what sets ours apart. Keyed by collection slug and
   merged into CATEGORIES, where a missing entry fails the build: a collection
   page without this is a bare listing, and we would rather not ship one.

   Written from the product brief in the site's register. Claims stay within
   what the catalogue supports — counts, materials and fitment are taken from
   the specifications in catalog.ts, not asserted here. */

export type Point = { title: string; body: string };

export type CategoryEditorial = {
  /** What the thing is. Sits beside the title, above the grid. */
  intro: string;
  /** Why it belongs at home, read as a list once the pieces have been seen. */
  reasons: { eyebrow: string; heading: string; items: Point[] };
  /** What sets a KQUEL piece apart. Six points fill the 3 × 2 grid. */
  difference: { heading: string; items: Point[] };
};

const AT_HOME = "Why it belongs at home";

export const COLLECTION_COPY: Partial<Record<string, CategoryEditorial>> = {
  "whirlpool-bathtubs": {
    intro:
      "A whirlpool bathtub is a bath with a pump behind it. Water is drawn from the shell and returned through jets set into its walls — directional jets at the sides, a column of finer jets up the backrest — while a separate blower lifts air through outlets in the floor. The massage is performed by the water itself.",
    reasons: {
      eyebrow: AT_HOME,
      heading: "Why a whirlpool bath belongs at home.",
      items: [
        {
          title: "Muscles let go",
          body: "Warm water takes the weight off the body and the jets take the rest. Twenty minutes at the end of a day reaches the fatigue that lying still cannot.",
        },
        {
          title: "The day is set down",
          body: "A bath is the last room of the day. With the jets running, it becomes one the day cannot follow you into.",
        },
        {
          title: "Circulation, worked",
          body: "Hydrotherapy is pressure and warmth applied together. The jets work the muscle; the heat opens the vessels beneath it.",
        },
        {
          title: "The spa, without the drive",
          body: "Everything a day spa arranges around a whirlpool — the heat, the pressure, the quiet — is here, on your own time and behind your own door.",
        },
        {
          title: "A room that gains value",
          body: "A bathroom is judged by its centrepiece. A whirlpool bath raises the room around it, and the house around that.",
        },
      ],
    },
    difference: {
      heading: "What makes a KQUEL whirlpool different.",
      items: [
        {
          title: "Sanitary-grade acrylic",
          body: "The shell is cast acrylic: non-porous, warm to the touch, and returned to its first finish with a cloth.",
        },
        {
          title: "Three layers behind it",
          body: "Every shell is backed with three layers of glass-reinforced plastic, so the rim does not flex and the form holds its line through a decade of heating and cooling.",
        },
        {
          title: "Two systems, not one",
          body: "Whirlpool and air run on separate circuits. The jets can be driven hard while the air stays soft, or the other way about.",
        },
        {
          title: "Shaped to the body",
          body: "Backrests are raked, seats set at the depth a body actually settles to, and the spine jets follow the line of the back rather than a straight rule.",
        },
        {
          title: "Motors that earn their keep",
          body: "Pumps and blowers are specified for efficiency and service life, and the parts that wear are the parts we supply on their own.",
        },
        {
          title: "Made to the room",
          body: "Single and double seats, glass or panelled sides, teak tops, lighting, audio and control — specified piece by piece rather than fixed by the range.",
        },
      ],
    },
  },

  sauna: {
    intro:
      "A sauna is a timber room and a heater. The heater holds the air at high temperature and low humidity — dry heat, the traditional kind — and the wood takes that temperature without ever becoming too hot to sit against. The body warms through, sweats, and is left with the particular stillness that follows.",
    reasons: {
      eyebrow: AT_HOME,
      heading: "Why a sauna belongs at home.",
      items: [
        {
          title: "Heat that reaches all the way down",
          body: "Dry heat warms the body through rather than at the surface. The rest that follows a sauna is unlike any other kind.",
        },
        {
          title: "Soreness, eased",
          body: "Warmed muscle loosens. A sitting after exertion, or after a long day of sitting still, takes the ache out before it sets.",
        },
        {
          title: "Circulation, raised",
          body: "As the body works to shed heat, the heart rate lifts and blood is sent to the skin — a gentle, sustained exercise taken sitting down.",
        },
        {
          title: "Recovery, the same day",
          body: "Heat has always been part of how athletes recover. A cabin at home means the sitting happens the same evening, not when the club next opens.",
        },
        {
          title: "A room with one purpose",
          body: "Most rooms in a house do several things. A sauna does one, and the house is better for containing it.",
        },
      ],
    },
    difference: {
      heading: "What makes a KQUEL sauna different.",
      items: [
        {
          title: "Timber chosen for heat",
          body: "The cabin is lined in wood selected for how it holds warmth and how it feels against skin, and insulated so the heater works less to keep it there.",
        },
        {
          title: "Heaters sized to the cabin",
          body: "Three and four kilowatt heaters matched to the volume they serve, so the room comes to temperature quickly and holds it without running flat out.",
        },
        {
          title: "Interiors without ornament",
          body: "Benches, backrests and lighting arranged in clean lines, so the cabin reads as part of the house rather than an appliance in it.",
        },
        {
          title: "Temperature that holds",
          body: "The heater keeps the cabin at the temperature you set. It does not drift hotter as the evening goes on.",
        },
        {
          title: "Built for the heat cycle",
          body: "Joinery specified for a room that expands and contracts every day, and hardware that does not corrode in it.",
        },
        {
          title: "Made to the space you have",
          body: "Every cabin is built to the room's dimensions; the listed sizes are starting points. The steam-cum-sauna runs both climates in one.",
        },
      ],
    },
  },

  steam: {
    intro:
      "A steam cabin is a sealed glass enclosure with a generator behind it. The generator fills the cabin with saturated air at a temperature the body can sit in for a long time — lower than a sauna, and wetter by a great deal. Ours run as a shower in the morning and seal for a steam cycle at night.",
    reasons: {
      eyebrow: AT_HOME,
      heading: "Why a steam room belongs at home.",
      items: [
        {
          title: "A deep, steady sweat",
          body: "Saturated air stops the body cooling itself, so it sweats fully and for as long as you sit. It is the oldest way of clearing the skin there is.",
        },
        {
          title: "Skin that drinks",
          body: "Warm, wet air opens the pores and leaves the skin hydrated rather than dried — the opposite of what a hot shower does to it.",
        },
        {
          title: "Tension, dissolved",
          body: "Moist heat reaches muscle without weight or pressure. It is the gentlest therapy here, and the one people most often fall asleep in.",
        },
        {
          title: "Easier breathing",
          body: "Warm, humid air loosens the chest and eases the airways. It is the reason the steam room is the one most people return to in winter.",
        },
        {
          title: "The spa, on a Tuesday",
          body: "A steam room is the part of a spa people book the whole day for. In the house, it is ten minutes after the shower.",
        },
      ],
    },
    difference: {
      heading: "What makes a KQUEL steam cabin different.",
      items: [
        {
          title: "A generator, not a kettle",
          body: "Steam is produced by a dedicated generator sized to the cabin, so the air saturates fully rather than fogging.",
        },
        {
          title: "Up to temperature quickly",
          body: "The cabin fills fast and the output holds steady for the length of the cycle — no waiting through the first ten minutes for it to arrive.",
        },
        {
          title: "Tempered glass throughout",
          body: "The enclosure is tempered safety glass, chosen to take heat and humidity daily and to keep its clarity through both.",
        },
        {
          title: "Every function on one panel",
          body: "Steam, shower, temperature and time are set from a single electronic panel, so the cabin is run without leaving the seat.",
        },
        {
          title: "A footprint for the corner you have",
          body: "Cabins from a metre square to 1500 × 1500 mm, with seating built in, so one fits the corner you have rather than the one you wish you had.",
        },
        {
          title: "For homes and for hotels",
          body: "The same cabin is specified for a family bathroom and for a hotel spa floor. The difference is the duty cycle, and both are catered for.",
        },
      ],
    },
  },

  spa: {
    intro:
      "A hot spa is a whirlpool bath built for more than one. The shell is larger and deeper, the water is held at temperature between sittings by an online heater and filtered in line, and the systems are scaled to match — up to three pumps, fourteen jets, eight up the backrests and twenty air outlets in the floor, with lighting and audio carried in the shell.",
    reasons: {
      eyebrow: AT_HOME,
      heading: "Why a hot spa belongs at home.",
      items: [
        {
          title: "Hot when you arrive",
          body: "The heater keeps the water at temperature, so a spa is stepped into rather than waited for.",
        },
        {
          title: "Room for company",
          body: "Four seats, four pillows. It is the one bath in the house that is better with someone else in it.",
        },
        {
          title: "The whirlpool, at scale",
          body: "Everything a whirlpool bath does, done with far more water and the pumps to move it.",
        },
        {
          title: "Water that stays clean",
          body: "In-line filtration and ozone disinfection keep a spa ready between sittings without draining it each time.",
        },
        {
          title: "Lit from below",
          body: "Lights beneath the waterline and speakers in the shell. After dark, the spa is the only light the room needs.",
        },
      ],
    },
    difference: {
      heading: "What makes a KQUEL spa different.",
      items: [
        {
          title: "A ten-millimetre shell",
          body: "The Aquel is cast at 10 mm, thicker than a bath, over the same three layers of reinforcement — a body built for the weight of water it holds.",
        },
        {
          title: "Heater and filter as standard",
          body: "On the Aquel and the Empress, the online heater, electronic panel and ozone cycle are fitted, not offered.",
        },
        {
          title: "Three pumps",
          body: "The Aquel runs three whirlpool pumps to fourteen jets, so pressure does not fall away when every seat is taken.",
        },
        {
          title: "A rated air system",
          body: "The 700 kWh air pump — the same blower specified for the pool — feeds twenty outlets across the floor.",
        },
        {
          title: "Sound in the shell",
          body: "Hi-fi speaker and FM radio built into the shell, run from the same panel as the pumps.",
        },
        {
          title: "Set in, not stood on",
          body: "The Aquel is finished with an eight-inch grating in place of side panels, so it sets into a deck or a floor rather than standing on it.",
        },
      ],
    },
  },

  showers: {
    intro:
      "A shower is water shaped by three things: pressure, temperature and the fall from the head. KQUEL shower fittings are the heads, valves and controls that decide all three — LED spa showers with one or three flow patterns, a waterfall head that drops water as a sheet, and single-flow and wall-mounted heads in five designs each.",
    reasons: {
      eyebrow: "Why it matters",
      heading: "Why the shower deserves the attention.",
      items: [
        {
          title: "Used more than anything else",
          body: "The shower is the fitting used every day by everyone in the house. It is where a difference in quality is felt most often.",
        },
        {
          title: "Fall, not just flow",
          body: "A wide head at the right height drops water rather than sprays it. The weight of it on the shoulders is a different thing from pressure.",
        },
        {
          title: "Light in the water",
          body: "LED heads light the stream itself. It is a small thing that changes how a dark bathroom is used at night.",
        },
        {
          title: "Temperature that holds",
          body: "A thermostatic valve keeps the temperature where it was set when a tap is opened elsewhere in the house.",
        },
        {
          title: "A pattern for the hour",
          body: "Rain, jet or sheet, switched at the wall. The same head serves the morning and the evening differently.",
        },
      ],
    },
    difference: {
      heading: "What makes a KQUEL shower different.",
      items: [
        {
          title: "Four finishes across the range",
          body: "Chrome, rose gold, black or gold on every head, so the shower matches the rest of the room's metal.",
        },
        {
          title: "One head, three patterns",
          body: "The three-function spa shower switches between flows at the wall rather than at the head.",
        },
        {
          title: "Water as a sheet",
          body: "The waterfall head drops an unbroken plane of water — the fall of a spout, at the height of a shower.",
        },
        {
          title: "A design for every wall",
          body: "Five single-flow heads and five wall-mounted heads, so the fitting is chosen for the room rather than the room adapted to it.",
        },
        {
          title: "Matched to the room's other parts",
          body: "Body jets, thermostatic diverters and linear drains from the same range, in the same finishes.",
        },
        {
          title: "Specified, then serviced",
          body: "The parts that wear are supplied on their own, so a valve is replaced rather than a wall opened.",
        },
      ],
    },
  },

  pools: {
    intro:
      "A pool, in the KQUEL sense, is a bath the size of a room. A twelve-foot shell cast at 10 mm, decked on two sides with stairs down to the water, and fitted with the systems of a hot spa — filtration, heating and ozone in line, whirlpool jets in the walls and air in the floor. Built to any size the site allows.",
    reasons: {
      eyebrow: AT_HOME,
      heading: "Why a pool belongs at home.",
      items: [
        {
          title: "Swim, then sit",
          body: "A plunge pool is short enough to be a bath and long enough to move in. Both are had from one body of water.",
        },
        {
          title: "Warm in the off months",
          body: "An online heater means the pool is used in the months a pool is usually left covered.",
        },
        {
          title: "A whirlpool, at room scale",
          body: "Jets in the walls and air in the floor make the pool the largest hydrotherapy bath in the house.",
        },
        {
          title: "Water that looks after itself",
          body: "Filtration, in-line filtering and ozone run continuously, so the pool is used rather than maintained.",
        },
        {
          title: "The garden's fixed point",
          body: "Decking on two sides and light beneath the water. A pool is the thing the rest of the outside is arranged around.",
        },
      ],
    },
    difference: {
      heading: "What makes a KQUEL pool different.",
      items: [
        {
          title: "Cast, not tiled",
          body: "A single shell at 10 mm over three layers of glass-reinforced plastic — no grout lines to fail and no liner to replace.",
        },
        {
          title: "Decked as part of the piece",
          body: "W.P.C decking on two sides with stairs, and a three-step ladder, supplied with the shell rather than built around it afterwards.",
        },
        {
          title: "Spa systems throughout",
          body: "Whirlpool pump and jets, spine jets, and the 700 kWh air pump feeding air bubble jets across the floor.",
        },
        {
          title: "Treated in line",
          body: "Filtration unit with motor, online filter, online heater and ozone disinfection — the full spa water plant, sized for the volume.",
        },
        {
          title: "Lit and wired",
          body: "Underwater LED light, hi-fi speaker and FM radio, all run from one electronic panel.",
        },
        {
          title: "Any size the site gives",
          body: "The twelve by seven is the listed piece. The shell is built to the dimensions the site allows.",
        },
      ],
    },
  },

  accessories: {
    intro:
      "Accessories are the working parts behind every piece in the catalogue, supplied on their own: the pumps, jets, blowers and panels that drive a whirlpool bath, and the valves, drains and traps that finish the bathroom around it. Specified for new work, and kept in supply for replacement.",
    reasons: {
      eyebrow: "Why they are sold alone",
      heading: "Why the parts are sold on their own.",
      items: [
        {
          title: "Because a bath is its parts",
          body: "A whirlpool bath is a shell and a set of systems. Knowing the systems by name is knowing what you are buying.",
        },
        {
          title: "For the tenth year",
          body: "Pumps and blowers work hardest. Having them singly is what keeps a bath in service past the point most are given up on.",
        },
        {
          title: "For a shell already in place",
          body: "A bath that came without a control panel, or whose pump has failed, is fitted rather than replaced.",
        },
        {
          title: "For the rest of the room",
          body: "Diverters, mixers, drains and traps in the same four finishes, so the bathroom's metal is one metal.",
        },
        {
          title: "For the specifier",
          body: "Architects and contractors can call the parts out by name at the drawing stage, and receive exactly those.",
        },
      ],
    },
    difference: {
      heading: "What makes KQUEL parts different.",
      items: [
        {
          title: "The same parts we fit",
          body: "Nothing here is a substitute line. These are the pumps, jets and panels fitted to the baths in the catalogue.",
        },
        {
          title: "Sized to the shell",
          body: "A pump is supplied to match the shell it serves — the difference between a bath that hums and one that roars.",
        },
        {
          title: "Four finishes, one range",
          body: "Chrome, rose gold, black or gold across valves, faucets, drains and traps.",
        },
        {
          title: "Serviceable in place",
          body: "Motors and panels are specified to be reached and replaced without lifting the shell.",
        },
        {
          title: "Air and water kept apart",
          body: "The blower and the whirlpool pump are distinct units, so either is serviced without touching the other.",
        },
        {
          title: "Finished to be seen",
          body: "Traps, stop valves and drains made to be exposed, not boxed in.",
        },
      ],
    },
  },
};
