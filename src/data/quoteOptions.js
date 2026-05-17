export const quoteServices = [
  { id: 'wedding', name: 'Wedding Photography', icon: '💍', startingPrice: 50000, description: 'Complete wedding day coverage' },
  { id: 'maternity', name: 'Maternity Shoot', icon: '🤰', startingPrice: 15000, description: 'Ethereal maternity portraits' },
  { id: 'newborn', name: 'Newborn Photography', icon: '👶', startingPrice: 12000, description: 'Gentle newborn studio session' },
  { id: 'milestone', name: 'Baby Milestone', icon: '🎂', startingPrice: 10000, description: 'Milestone & cake smash sessions' },
  { id: 'fashion', name: 'Fashion Portraits', icon: '📸', startingPrice: 20000, description: 'High-fashion editorial portraits' },
];

export const packageTiers = {
  wedding: [
    { id: 'essential', name: 'Essential', price: 50000, popular: false, features: ['4 hours coverage','1 lead photographer','200 edited photos','Online gallery','Standard retouching','Digital delivery'] },
    { id: 'premium', name: 'Premium', price: 100000, popular: true, features: ['8 hours coverage','2 photographers','500 edited photos','Online gallery','Advanced retouching','1 premium album (30 pages)','Same-day 20 preview images','Pre-wedding consultation'] },
    { id: 'luxury', name: 'Luxury', price: 200000, popular: false, features: ['Full day coverage','2 photographers + videographer','1000+ edited photos','Online gallery','Magazine-grade retouching','2 premium albums (40 pages each)','Same-day edit video','Pre-wedding shoot included','Canvas print set (5 prints)','Drone coverage','Priority delivery'] },
  ],
  maternity: [
    { id: 'essential', name: 'Essential', price: 15000, popular: false, features: ['1 hour session','1 location','15 edited photos','Digital delivery','Basic retouching'] },
    { id: 'premium', name: 'Premium', price: 25000, popular: true, features: ['2 hour session','2 locations (studio + outdoor)','30 edited photos','Wardrobe from studio collection','Partner inclusion','Advanced retouching','Online gallery'] },
    { id: 'luxury', name: 'Luxury', price: 45000, popular: false, features: ['3 hour session','Multiple locations','50+ edited photos','Full wardrobe styling','Hair & makeup artist','Fine art prints (3 prints)','Maternity album (20 pages)','Magazine-grade retouching'] },
  ],
  newborn: [
    { id: 'essential', name: 'Essential', price: 12000, popular: false, features: ['1.5 hour session','Studio session','15 edited photos','Digital delivery','Basic wraps & props'] },
    { id: 'premium', name: 'Premium', price: 22000, popular: true, features: ['2.5 hour session','Studio session','25 edited photos','Family & sibling shots','Premium props & setups','Advanced retouching','Online gallery'] },
    { id: 'luxury', name: 'Luxury', price: 40000, popular: false, features: ['3+ hour session','Studio + home session','40+ edited photos','Full family session','Custom theme setup','Fine art prints (3 prints)','Baby album (20 pages)','Custom birth announcement cards'] },
  ],
  milestone: [
    { id: 'essential', name: 'Essential', price: 10000, popular: false, features: ['1 hour session','1 themed setup','12 edited photos','Digital delivery'] },
    { id: 'premium', name: 'Premium', price: 18000, popular: true, features: ['1.5 hour session','2 themed setups','20 edited photos','Cake smash included','Family shots','Online gallery'] },
    { id: 'luxury', name: 'Luxury', price: 30000, popular: false, features: ['2+ hour session','3 themed setups','35+ edited photos','Cake smash + bubble bath','Full family session','Mini album (15 pages)','Canvas print'] },
  ],
  fashion: [
    { id: 'essential', name: 'Essential', price: 20000, popular: false, features: ['1 hour session','1 look/outfit','15 edited photos','Studio session','Digital delivery'] },
    { id: 'premium', name: 'Premium', price: 35000, popular: true, features: ['2 hour session','3 looks/outfits','30 edited photos','Studio + location','Art direction','Advanced retouching','Online gallery'] },
    { id: 'luxury', name: 'Luxury', price: 60000, popular: false, features: ['4 hour session','5+ looks/outfits','50+ edited photos','Multiple locations','Hair & makeup artist','Professional styling','Magazine-grade retouching','Fine art prints (5 prints)','Portfolio book'] },
  ],
};

export const addons = [
  { id: 'prewedding', name: 'Pre-Wedding Shoot', description: 'A romantic pre-wedding session at a location of your choice', price: 15000, icon: '💑', applicableTo: ['wedding'] },
  { id: 'drone', name: 'Drone Coverage', description: 'Stunning aerial shots of your venue and celebrations', price: 10000, icon: '🚁', applicableTo: ['wedding','maternity','fashion'] },
  { id: 'samedayedit', name: 'Same-Day Edit Video', description: 'A highlight video edited and delivered on the same day', price: 20000, icon: '🎬', applicableTo: ['wedding'] },
  { id: 'photobooth', name: 'Photo Booth', description: 'Fun instant-print photo booth with props', price: 12000, icon: '🎭', applicableTo: ['wedding'] },
  { id: 'extraphotographer', name: 'Extra Photographer', description: 'Additional photographer for more coverage angles', price: 8000, icon: '📷', applicableTo: ['wedding','fashion'] },
  { id: 'rushdelivery', name: 'Rush Delivery', description: 'Get your photos delivered within 2 weeks instead of 4-6', price: 5000, icon: '⚡', applicableTo: ['wedding','maternity','newborn','milestone','fashion'] },
  { id: 'canvasprints', name: 'Canvas Prints Set', description: 'Set of 5 premium canvas prints in various sizes', price: 8000, icon: '🖼️', applicableTo: ['wedding','maternity','newborn','milestone','fashion'] },
  { id: 'albumupgrade', name: 'Album Upgrade', description: 'Upgrade to premium Italian leather-bound album', price: 15000, icon: '📖', applicableTo: ['wedding','newborn'] },
  { id: 'makeup', name: 'Hair & Makeup Artist', description: 'Professional makeup and hair styling for your shoot', price: 7000, icon: '💄', applicableTo: ['maternity','fashion','milestone'] },
  { id: 'videofilm', name: 'Cinematic Film', description: 'A professionally edited 5-8 minute cinematic film', price: 25000, icon: '🎥', applicableTo: ['wedding'] },
];

export default { quoteServices, packageTiers, addons };
