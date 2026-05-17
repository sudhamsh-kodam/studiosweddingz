import bbHero from '../assets/images/bb-hero.png';
import bbMaternity from '../assets/images/bb-maternity-outdoor.png';
import bbCakeSmash from '../assets/images/bb-cake-smash.png';
import bbBabyShower from '../assets/images/bb-baby-shower.png';
import bbCradleCeremony from '../assets/images/bb-cradle-ceremony.png';
import bbBirthdayParty from '../assets/images/bb-birthday-party.png';
import heroNewborn from '../assets/images/hero-newborn.png';
import heroMaternity from '../assets/images/hero-maternity.png';
import heroKids from '../assets/images/hero-kids.png';

export const bbServices = [
  {
    id: 'maternity',
    title: 'Maternity Photography',
    tagline: 'Celebrating the glow of new life',
    icon: '🤰',
    image: bbMaternity,
    description:
      'Pregnancy is one of life\'s most beautiful chapters. Our maternity sessions are designed to make you feel like a goddess — radiant, powerful, and utterly beautiful. We blend soft natural light with artistic direction to create portraits that celebrate the miracle growing within you.',
    highlights: [
      'Studio & outdoor golden-hour sessions',
      'Professional styling & wardrobe from our curated collection',
      'Partner & family inclusion',
      'Fine art & editorial retouching',
      'Best scheduled at 28-34 weeks',
    ],
  },
  {
    id: 'babyshower',
    title: 'Baby Shower Photography',
    tagline: 'Celebrating the mom-to-be',
    icon: '🎀',
    image: bbBabyShower,
    description:
      'Your baby shower is a beautiful celebration of love, family, and anticipation. Our photographers capture every heartfelt moment — from the gorgeous décor and games to the laughter, tears of joy, and that special glow of the mom-to-be surrounded by loved ones.',
    highlights: [
      'Full event coverage (2-4 hours)',
      'Décor & detail shots',
      'Candid guest interactions',
      'Gift opening & games documentation',
      'Same-day sneak peeks available',
    ],
  },
  {
    id: 'newborn',
    title: 'Newborn Photography',
    tagline: 'Tiny moments, infinite memories',
    icon: '👶',
    image: heroNewborn,
    description:
      'Those first few days are fleeting — tiny fingers, peaceful yawns, and the softest skin you\'ll ever touch. Our newborn sessions are conducted with the utmost care and patience. Every session is baby-led, ensuring your little one\'s comfort and safety are always the priority.',
    highlights: [
      'Baby-safe, temperature-controlled studio',
      'Patient, baby-led sessions (2-3 hours)',
      'Natural & lifestyle posing — never forced',
      'Family & sibling portraits included',
      'Ideally within the first 14 days',
    ],
  },
  {
    id: 'cradle',
    title: 'Cradle Ceremony Photography',
    tagline: 'Honoring tradition beautifully',
    icon: '🪔',
    image: bbCradleCeremony,
    description:
      'The cradle ceremony (Naming ceremony / Naamkaran) is a sacred and joyful tradition marking your baby\'s arrival into the family. We capture the beauty of the decorated cradle, the rituals, the blessings of elders, and the emotional moments as your family comes together to welcome the newest member.',
    highlights: [
      'Full ceremony coverage',
      'Traditional ritual documentation',
      'Decorated cradle & venue detail shots',
      'Family group portraits',
      'Candid blessings & emotional moments',
    ],
  },
  {
    id: 'milestone',
    title: 'Kids & Milestones',
    tagline: 'Every milestone is a masterpiece',
    icon: '🎂',
    image: bbCakeSmash,
    description:
      'From the first smile to the first steps, every milestone deserves to be celebrated. Our milestone sessions capture your baby\'s unique personality through creative, playful photography — including cake smash celebrations, sitter sessions, and first birthday parties.',
    highlights: [
      'Themed setups & custom backdrops',
      'Cake smash & bubble bath sessions',
      'Sitter milestone (6-8 months)',
      'First birthday celebrations',
      'Custom props & styling included',
    ],
  },
  {
    id: 'birthday',
    title: 'Birthday Photography',
    tagline: 'Making every birthday unforgettable',
    icon: '🎈',
    image: bbBirthdayParty,
    description:
      'From elaborate themed parties to intimate family celebrations, we document every magical moment of your child\'s birthday. Our photographers blend into the festivities to capture genuine joy — the cake cutting, the first bite, the games, and all those adorable candid moments you\'ll treasure forever.',
    highlights: [
      'Full party event coverage (3-5 hours)',
      'Venue & décor detail photography',
      'Cake cutting & candid moments',
      'Guest interactions & group photos',
      'Same-day highlight reel available',
    ],
  },
];

export const bbPackages = {
  maternity: [
    {
      id: 'essential',
      name: 'Essential',
      price: 15000,
      popular: false,
      features: [
        '1 hour session',
        '1 location',
        '15 edited photos',
        'Digital delivery',
        'Basic retouching',
      ],
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 25000,
      popular: true,
      features: [
        '2 hour session',
        '2 locations (studio + outdoor)',
        '30 edited photos',
        'Wardrobe from studio collection',
        'Partner inclusion',
        'Advanced retouching',
        'Online gallery',
      ],
    },
    {
      id: 'luxury',
      name: 'Luxury',
      price: 45000,
      popular: false,
      features: [
        '3 hour session',
        'Multiple locations',
        '50+ edited photos',
        'Full wardrobe styling',
        'Hair & makeup artist',
        'Fine art prints (3 prints)',
        'Maternity album (20 pages)',
        'Magazine-grade retouching',
      ],
    },
  ],
  babyshower: [
    {
      id: 'essential',
      name: 'Essential',
      price: 12000,
      popular: false,
      features: [
        '2 hours coverage',
        '1 photographer',
        '50 edited photos',
        'Décor & detail shots',
        'Digital delivery',
      ],
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 22000,
      popular: true,
      features: [
        '3 hours coverage',
        '1 photographer',
        '100 edited photos',
        'Décor, games & gift opening',
        'Candid + posed group shots',
        'Online gallery',
        'Same-day 10 sneak peeks',
      ],
    },
    {
      id: 'luxury',
      name: 'Luxury',
      price: 40000,
      popular: false,
      features: [
        '4+ hours coverage',
        '2 photographers',
        '200+ edited photos',
        'Full event documentation',
        'Short highlight video',
        'Premium photo album (20 pages)',
        'Same-day 20 sneak peeks',
        'Canvas print',
      ],
    },
  ],
  newborn: [
    {
      id: 'essential',
      name: 'Essential',
      price: 12000,
      popular: false,
      features: [
        '1.5 hour session',
        'Studio session',
        '15 edited photos',
        'Digital delivery',
        'Basic wraps & props',
      ],
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 22000,
      popular: true,
      features: [
        '2.5 hour session',
        'Studio session',
        '25 edited photos',
        'Family & sibling shots',
        'Premium props & setups',
        'Advanced retouching',
        'Online gallery',
      ],
    },
    {
      id: 'luxury',
      name: 'Luxury',
      price: 40000,
      popular: false,
      features: [
        '3+ hour session',
        'Studio + home session',
        '40+ edited photos',
        'Full family session',
        'Custom theme setup',
        'Fine art prints (3 prints)',
        'Baby album (20 pages)',
        'Custom birth announcement cards',
      ],
    },
  ],
  cradle: [
    {
      id: 'essential',
      name: 'Essential',
      price: 10000,
      popular: false,
      features: [
        '1.5 hours coverage',
        '1 photographer',
        '40 edited photos',
        'Ceremony highlights',
        'Digital delivery',
      ],
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 20000,
      popular: true,
      features: [
        '3 hours coverage',
        '1 photographer',
        '80 edited photos',
        'Full ceremony + rituals',
        'Family group portraits',
        'Cradle & décor detail shots',
        'Online gallery',
      ],
    },
    {
      id: 'luxury',
      name: 'Luxury',
      price: 35000,
      popular: false,
      features: [
        '4+ hours coverage',
        '2 photographers',
        '150+ edited photos',
        'Full ceremony documentation',
        'Extended family portraits',
        'Short highlight video',
        'Premium photo album (20 pages)',
        'Same-day sneak peeks',
      ],
    },
  ],
  milestone: [
    {
      id: 'essential',
      name: 'Essential',
      price: 10000,
      popular: false,
      features: [
        '1 hour session',
        '1 themed setup',
        '12 edited photos',
        'Digital delivery',
      ],
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 18000,
      popular: true,
      features: [
        '1.5 hour session',
        '2 themed setups',
        '20 edited photos',
        'Cake smash included',
        'Family shots',
        'Online gallery',
      ],
    },
    {
      id: 'luxury',
      name: 'Luxury',
      price: 30000,
      popular: false,
      features: [
        '2+ hour session',
        '3 themed setups',
        '35+ edited photos',
        'Cake smash + bubble bath',
        'Full family session',
        'Mini album (15 pages)',
        'Canvas print',
      ],
    },
  ],
  birthday: [
    {
      id: 'essential',
      name: 'Essential',
      price: 15000,
      popular: false,
      features: [
        '2 hours coverage',
        '1 photographer',
        '50 edited photos',
        'Cake cutting & key moments',
        'Digital delivery',
      ],
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 28000,
      popular: true,
      features: [
        '4 hours coverage',
        '1 photographer',
        '120 edited photos',
        'Full party documentation',
        'Candid + group shots',
        'Venue & décor detail shots',
        'Online gallery',
        'Same-day 15 sneak peeks',
      ],
    },
    {
      id: 'luxury',
      name: 'Luxury',
      price: 50000,
      popular: false,
      features: [
        '6+ hours coverage',
        '2 photographers',
        '250+ edited photos',
        'Full event coverage',
        'Short highlight video (3-5 min)',
        'Premium photo album (30 pages)',
        'Photo booth setup',
        'Same-day edit reel',
        'Canvas print set',
      ],
    },
  ],
};

export const bbTestimonials = [
  {
    name: 'Priya & Rahul',
    service: 'Maternity',
    quote:
      'The maternity session was beyond magical. They made us feel so comfortable and the photos look like they belong in a magazine. Every time we look at them, we\'re transported back to that beautiful evening.',
    rating: 5,
  },
  {
    name: 'Sneha M.',
    service: 'Newborn',
    quote:
      'We were nervous about our 10-day-old being in a studio, but the team was incredibly gentle and patient. The baby slept through most of it! The photos are absolutely precious — our most treasured possession.',
    rating: 5,
  },
  {
    name: 'Ananya & Vikram',
    service: 'Cake Smash',
    quote:
      'Our son\'s first birthday cake smash session was SO much fun! The setup was gorgeous, the photos are hilarious and adorable. We can\'t stop sharing them with everyone!',
    rating: 5,
  },
  {
    name: 'Divya K.',
    service: 'Maternity + Newborn',
    quote:
      'We booked both the maternity and newborn package and it was the best decision. Having the same photographer who already knew us made the newborn session feel so natural and intimate.',
    rating: 5,
  },
  {
    name: 'Lakshmi & Arun',
    service: 'Cradle Ceremony',
    quote:
      'They captured every ritual, every blessing, and every smile at our baby\'s naming ceremony. The photos of the decorated cradle are stunning — our family couldn\'t believe how beautiful they turned out.',
    rating: 5,
  },
  {
    name: 'Meera S.',
    service: 'Birthday Party',
    quote:
      'Our daughter\'s 3rd birthday party was captured so beautifully! Every candid moment, the cake cutting, her playing with friends — we have the most amazing memories to look back on.',
    rating: 5,
  },
];

export const bbFaqs = [
  {
    question: 'When is the best time to book a maternity shoot?',
    answer:
      'We recommend scheduling between 28-34 weeks of pregnancy when your bump is beautifully visible and you\'re still comfortable. Book early as our slots fill up quickly!',
  },
  {
    question: 'How old should my baby be for a newborn shoot?',
    answer:
      'Ideally within the first 14 days when babies are sleepiest and most flexible for those adorable curled-up poses. We recommend booking during pregnancy to secure your preferred date.',
  },
  {
    question: 'Do you provide wardrobe and props?',
    answer:
      'Yes! We have a curated collection of maternity gowns, fabrics, newborn wraps, and milestone props. We also provide a detailed styling guide before your session.',
  },
  {
    question: 'How long does a newborn session take?',
    answer:
      'Typically 2-3 hours, allowing plenty of time for feeding, soothing, and diaper changes. We never rush — baby always sets the pace.',
  },
  {
    question: 'Is your studio safe for newborns?',
    answer:
      'Absolutely! Our studio is temperature-controlled, sanitized before each session, and all props meet safety standards. Our photographers are trained in newborn handling and safety.',
  },
  {
    question: 'Do you cover baby shower events?',
    answer:
      'Yes! We offer full baby shower coverage including décor details, candid moments, games, gift opening, and group portraits. We blend into the event so every genuine moment is captured naturally.',
  },
  {
    question: 'What does cradle ceremony coverage include?',
    answer:
      'Our cradle ceremony coverage includes the complete rituals, decorated cradle detail shots, family blessings, group portraits, and candid moments throughout the celebration. We\'re experienced with traditional ceremonies and know which moments matter most.',
  },
  {
    question: 'Do you cover birthday parties at any venue?',
    answer:
      'Yes! We cover birthday parties at homes, banquet halls, outdoor venues, restaurants, and party venues. We adapt our equipment and style to suit any location and lighting condition.',
  },
  {
    question: 'Can I combine maternity and newborn packages?',
    answer:
      'Yes! We offer special combo pricing when you book both maternity and newborn sessions together. Use our Build Your Quote tool to see the combined pricing.',
  },
  {
    question: 'What milestones do you photograph?',
    answer:
      'We cover 3-month, 6-month (sitter), 9-month, and 1st birthday milestones. We also offer cake smash sessions, bubble bath shoots, and custom themed setups.',
  },
  {
    question: 'Can my partner and other children be included?',
    answer:
      'Of course! We encourage family participation. Some of the most beautiful shots include siblings and partners — these moments are about your whole family.',
  },
];

export const bbGalleryImages = [
  { src: heroMaternity, alt: 'Maternity portrait in golden studio', category: 'Maternity' },
  { src: heroNewborn, alt: 'Sleeping newborn in soft wrap', category: 'Newborn' },
  { src: bbCakeSmash, alt: 'Baby cake smash celebration', category: 'Milestones' },
  { src: bbBabyShower, alt: 'Elegant baby shower celebration', category: 'Baby Shower' },
  { src: bbCradleCeremony, alt: 'Traditional cradle ceremony', category: 'Cradle Ceremony' },
  { src: bbBirthdayParty, alt: 'Kids birthday party celebration', category: 'Birthday' },
  { src: bbMaternity, alt: 'Outdoor golden hour maternity', category: 'Maternity' },
  { src: bbHero, alt: 'Maternity and newborn composite', category: 'Newborn' },
  { src: heroKids, alt: 'Happy toddler milestone portrait', category: 'Milestones' },
];
