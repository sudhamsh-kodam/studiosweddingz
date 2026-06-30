export const quoteServices = [
  { id: 'wedding', name: 'Wedding Photography', icon: '💍', startingPrice: 50000, description: 'Complete wedding day coverage' },
  { id: 'maternity', name: 'Maternity Shoot', icon: '🤰', startingPrice: 5000, description: 'Ethereal maternity portraits' },
  { id: 'newborn', name: 'Newborn Photography', icon: '👶', startingPrice: 5000, description: 'Gentle newborn studio session' },
  { id: 'milestone', name: 'Baby Milestone', icon: '🎂', startingPrice: 10000, description: 'Milestone & cake smash sessions' },
  { id: 'fashion', name: 'Fashion Portraits', icon: '📸', startingPrice: 20000, description: 'High-fashion editorial portraits' },
  { id: 'sareeCeremony', name: 'Saree / Dhoti Ceremony', icon: '✨', startingPrice: 20000, description: 'Traditional coming-of-age ceremony coverage' },
  { id: 'birthday', name: 'Birthday Event', icon: '🎉', startingPrice: 20000, description: 'Fun and memorable birthday celebration coverage' },
  { id: 'cradleCeremony', name: 'Cradle Ceremony', icon: '🚼', startingPrice: 20000, description: 'Heartwarming naming and cradle ceremony coverage' },
  { id: 'babyShower', name: 'Baby Shower Ceremony', icon: '🍼', startingPrice: 20000, description: 'Joyful baby shower and godh bharai coverage' },
  { id: 'anniversary', name: 'Anniversary Ceremony', icon: '🥂', startingPrice: 20000, description: 'Romantic anniversary celebration coverage' },
];

export const packageTiers = {
  wedding: [
    { id: 'essential', name: 'Essential', price: 50000, popular: false, features: ['4 hours coverage', '1 lead photographer', '200 edited photos', 'Online gallery', 'Standard retouching', 'Digital delivery'] },
    { id: 'premium', name: 'Premium', price: 100000, popular: true, features: ['8 hours coverage', '2 photographers', '500 edited photos', 'Online gallery', 'Advanced retouching', '1 premium album (30 pages)', 'Same-day 20 preview images', 'Pre-wedding consultation'] },
    { id: 'luxury', name: 'Luxury', price: 200000, popular: false, features: ['Full day coverage', '2 photographers + videographer', '1000+ edited photos', 'Online gallery', 'Magazine-grade retouching', '2 premium albums (40 pages each)', 'Same-day edit video', 'Pre-wedding shoot included', 'Canvas print set (5 prints)', 'Drone coverage', 'Priority delivery'] },
  ],
  maternity: [
    { id: 'essential', name: 'Essential', price: 5000, popular: false, features: ['1 hour session', 'Studio', 'Basic Hair & makeup', '1 Outfit from studio collection / 1 Saree from client', '5 edited photos', 'Partner inclusion', '1 Studio Themes selective', 'Online gallery'] },
    { id: 'premium', name: 'Premium', price: 10000, popular: true, features: ['2 hour session', 'Studio', 'Basic Hair & makeup', '2 Outfits from studio collection / 1 Outfit from studio + 1 Saree from client', '10 edited photos', 'Partner inclusion', '2 Studio Themes selective', 'Online gallery'] },
    { id: 'luxury', name: 'Luxury', price: 15000, popular: false, features: ['3 hour session', '2 locations (studio + outdoor)', 'Basic Hair & makeup', '2 Outfits from studio collection + 1 Saree from client', '20 edited photos', 'Partner inclusion', '3 Studio Themes selective', 'Online gallery'] },
  ],
  newborn: [
    { id: 'essential', name: 'Essential', price: 5000, popular: false, features: ['Studio', '1 Wrap', '1 Theme', '1 Hour session', 'Digital delivery', '5 edited pics'] },
    { id: 'premium', name: 'Premium', price: 10000, popular: true, features: ['Studio', '2 Wrap', '2 Theme', '2 Hour session', 'Digital delivery', 'Family inclusion', '15 edited pics'] },
    { id: 'luxury', name: 'Luxury', price: 15000, popular: false, features: ['Studio', '3 Wrap', '3 Theme', '4 Hour session', 'Digital delivery', 'Family inclusion', '30 edited pics', '1 standard album'] },
  ],
  milestone: [
    { id: 'essential', name: 'Essential', price: 10000, popular: false, features: ['Photography', 'Location client selection', 'Indoor & outdoor', '12 edited photos', 'Digital delivery'] },
    { id: 'premium', name: 'Premium', price: 25000, popular: true, features: ['Photography', 'Videography', 'Location client selection', 'Indoor & outdoor', '20 edited photos', 'Teaser', 'Digital delivery'] },
    { id: 'luxury', name: 'Luxury', price: 35000, popular: false, features: ['Photography', 'Videography', 'Studio inclusion', 'Indoor & outdoor', '20 edited photos', 'Teaser', 'Digital delivery', 'Standard album'] },
  ],
  fashion: [
    { id: 'essential', name: 'Essential', price: 20000, popular: false, features: ['1 hour session', '1 look/outfit', '15 edited photos', 'Studio session', 'Digital delivery'] },
    { id: 'premium', name: 'Premium', price: 35000, popular: true, features: ['2 hour session', '3 looks/outfits', '30 edited photos', 'Studio + location', 'Art direction', 'Advanced retouching', 'Online gallery'] },
    { id: 'luxury', name: 'Luxury', price: 60000, popular: false, features: ['4 hour session', '5+ looks/outfits', '50+ edited photos', 'Multiple locations', 'Hair & makeup artist', 'Professional styling', 'Magazine-grade retouching', 'Fine art prints (5 prints)', 'Portfolio book'] },
  ],

  birthday: [
    { id: 'essential', name: 'Essential', price: 20000, popular: false, features: ['Traditional photography', 'Traditional videography', 'Digital delivery', 'Edited Video', '6 hours session'] },
    { id: 'premium', name: 'Premium', price: 30000, popular: true, features: ['Traditional photography', 'Traditional videography', 'Candid photographer / Cinematography', 'Digital delivery', 'Edited Video', 'Promo', '6 hours session'] },
    { id: 'luxury', name: 'Luxury', price: 50000, popular: false, features: ['Traditional photography', 'Traditional videography', 'Candid photographer', 'Cinematography', 'Digital delivery', 'Edited Video', 'Teaser', 'Promo', '6 hours session'] },
  ],
  birthdayPreshoot: [
    { id: 'photo_only', name: 'Photography Only', price: 10000, popular: false, features: ['Photography', '4 hour session', 'Digital delivery'] },
    { id: 'video_only', name: 'Videography Only', price: 10000, popular: false, features: ['Videography', '4 hour session', 'Digital delivery'] },
    { id: 'photo_video_studio', name: 'Photo + Video + Studio', price: 30000, popular: true, features: ['Photography', 'Videography', 'Studio charges included', '4 hour session', 'Digital delivery'] },
  ],
  cradleCeremony: [
    { id: 'essential', name: 'Essential', price: 20000, popular: false, features: ['Traditional photography', 'Traditional videography', 'Digital delivery', 'Edited Video', '6 hours session'] },
    { id: 'premium', name: 'Premium', price: 30000, popular: true, features: ['Traditional photography', 'Traditional videography', 'Candid photographer / Cinematography', 'Digital delivery', 'Edited Video', 'Promo', '6 hours session'] },
    { id: 'luxury', name: 'Luxury', price: 50000, popular: false, features: ['Traditional photography', 'Traditional videography', 'Candid photographer', 'Cinematography', 'Digital delivery', 'Edited Video', 'Teaser', 'Promo', '6 hours session'] },
  ],
  babyShower: [
    { id: 'essential', name: 'Essential', price: 20000, popular: false, features: ['Traditional photography', 'Traditional videography', 'Digital delivery', 'Edited Video', '6 hours session'] },
    { id: 'premium', name: 'Premium', price: 30000, popular: true, features: ['Traditional photography', 'Traditional videography', 'Candid photographer / Cinematography', 'Digital delivery', 'Edited Video', 'Promo', '6 hours session'] },
    { id: 'luxury', name: 'Luxury', price: 50000, popular: false, features: ['Traditional photography', 'Traditional videography', 'Candid photographer', 'Cinematography', 'Digital delivery', 'Edited Video', 'Teaser', 'Promo', '6 hours session'] },
  ],
  anniversary: [
    { id: 'essential', name: 'Essential', price: 20000, popular: false, features: ['Traditional photography', 'Traditional videography', 'Digital delivery', 'Edited Video', '6 hours session'] },
    { id: 'premium', name: 'Premium', price: 30000, popular: true, features: ['Traditional photography', 'Traditional videography', 'Candid photographer / Cinematography', 'Digital delivery', 'Edited Video', 'Promo', '6 hours session'] },
    { id: 'luxury', name: 'Luxury', price: 50000, popular: false, features: ['Traditional photography', 'Traditional videography', 'Candid photographer', 'Cinematography', 'Digital delivery', 'Edited Video', 'Teaser', 'Promo', '6 hours session'] },
  ],
};

export const addons = [
  { id: 'pressbook', name: 'Press Book Album', description: 'Elegant custom-designed coffee table book with premium matte, glossy, feather touch, embossed, silk matte finish press pages (40 leafs per album)', price: 20000, icon: '📚', applicableTo: ['wedding', 'newborn', 'candid', 'traditional', 'sareeCeremony', 'birthday', 'cradleCeremony', 'babyShower', 'anniversary'] },
  { id: 'magnumalbum', name: 'Magnum Album', description: 'Signature ultra-premium handcrafted leather-bound album with lay-flat sheets (40 leafs per album)', price: 25000, icon: '📖', applicableTo: ['wedding', 'newborn', 'candid', 'traditional', 'sareeCeremony', 'birthday', 'cradleCeremony', 'babyShower', 'anniversary'] },
  { id: 'standardalbum', name: 'Standard Album (15 Sheets)', description: 'Custom-designed standard photo album (15 sheets)', price: 5000, icon: '📘', applicableTo: ['milestone', 'maternity'] },
  { id: 'makeup', name: 'Hair & Makeup Artist', description: 'Professional makeup and hair styling for your shoot', price: 7000, icon: '💄', applicableTo: ['maternity', 'fashion'] },
  { id: 'videofilm', name: 'Cinematic Film', description: 'A professionally edited 5-8 minute cinematic film', price: 25000, icon: '🎥', applicableTo: ['wedding', 'candid'] },
];

export const weddingEvents = [
  { id: 'engagement', name: 'Engagement', image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'The official ring ceremony to kick off the wedding journey' },
  { id: 'combined_haldi', name: 'Combined Haldi', image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Combined haldi celebration for both bride and groom together' },
  { id: 'groom_haldi', name: 'Groom Haldi', image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Vibrant and messy haldi celebrations' },
  { id: 'bride_haldi', name: 'Bride Haldi', image: 'https://images.unsplash.com/photo-1621886292650-520f76c747d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Beautiful turmeric rituals for the bride' },
  { id: 'pellikoduku', name: 'Pellikoduku / Groom Ceremony', image: 'https://images.unsplash.com/photo-1605335123048-18e38d4a5202?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Making of the groom ceremonies', multiDay: true },
  { id: 'pellikuthuru', name: 'Pellikuthuru / Bride Ceremony', image: 'https://images.unsplash.com/photo-1595981267035-7b04d84b52a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Making of the bride ceremonies', multiDay: true },
  { id: 'wedding', name: 'The Wedding Day', image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Capturing every moment of your beautiful wedding ceremony' },
  { id: 'reception', name: 'Reception', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Elegant evening reception and dinner' },
  { id: 'prewedding', name: 'Pre-Wedding Shoot', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Romantic couple portrait session before the wedding' },
  { id: 'mehendi', name: 'Mehendi', image: 'https://images.unsplash.com/photo-1562635398-333eec2edeb7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Intricate henna art and music' },
  { id: 'sangeet', name: 'Sangeet', image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'A night of dance, music, and celebration' },
  { id: 'cocktail', name: 'Cocktail Party', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Glamorous evening with friends and family' },
  { id: 'vratham', name: 'Vratham', image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Auspicious pre-wedding pooja rituals' },
];

export const sareeEvents = [
  { id: 'saree_haldi', name: 'Haldi', image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Vibrant haldi ceremony celebrations' },
  { id: 'saree_mehendi', name: 'Mehendi', image: 'https://images.unsplash.com/photo-1562635398-333eec2edeb7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Beautiful mehendi art and celebrations' },
  { id: 'saree_sangeet', name: 'Sangeet', image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'A night of dance, music, and celebration' },
  { id: 'saree_preshoot', name: 'Pre-Shoot', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'A beautiful portrait session before the ceremony' },
  { id: 'saree_ceremony', name: 'Saree / Dhoti Ceremony', image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'The traditional coming-of-age saree or dhoti ceremony' },
];

export const eventServicesList = [
  { id: 'traditional_photo', name: 'Traditional Photo', icon: '📷', price: 10000 },
  { id: 'candid_photo', name: 'Candid Photo', icon: '📸', price: 15000 },
  { id: 'traditional_video', name: 'Traditional Video', icon: '🎥', price: 10000 },
  { id: 'cinematic_video', name: 'Cinematic Video', icon: '🎬', price: 20000 },
  { id: 'drone', name: 'Drone Coverage', icon: '🚁', price: 10000 },
  { id: 'live_streaming', name: 'Live Streaming', icon: '📡', price: 10000 },
  { id: 'led_screen', name: 'LED Screen', icon: '📺', price: 15000 },
  { id: 'prewedding_photo', name: 'Photography', icon: '📸', price: 20000 },
  { id: 'prewedding_photo_video', name: 'Photography & Videography', icon: '🎥', price: 40000 },
];

export default { quoteServices, packageTiers, addons, weddingEvents, sareeEvents, eventServicesList };
