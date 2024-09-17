const Astrologers = [
  {
    id: 1,
    name: 'Astrologer A',
    image:
      'http://ts4.mm.bing.net/th?id=OIP.d9KeJDVFEDBgK5_EyzEDiwHaK_&pid=15.1',
    chargePerMinute: 50,
    isFree: false,
    specialty: 'Vedic Astrology',
  },
  {
    id: 2,
    name: 'Astrologer B',
    image:
      'http://ts4.mm.bing.net/th?id=OIP.d9KeJDVFEDBgK5_EyzEDiwHaK_&pid=15.1',
    chargePerMinute: 0,
    isFree: true, // Currently offering free sessions
    specialty: 'Western Astrology',
  },
  {
    id: 3,
    name: 'Astrologer C',
    image:
      'http://ts4.mm.bing.net/th?id=OIP.d9KeJDVFEDBgK5_EyzEDiwHaK_&pid=15.1',
    chargePerMinute: 70,
    isFree: false,
    specialty: 'Numerology',
  },
  {
    id: 4,
    name: 'Astrologer D',
    image:
      'http://ts4.mm.bing.net/th?id=OIP.d9KeJDVFEDBgK5_EyzEDiwHaK_&pid=15.1',
    chargePerMinute: 0,
    isFree: true, // Currently offering free sessions
    specialty: 'Vedic Astrology',
  },
  {
    id: 5,
    name: 'Astrologer E',
    image:
      'http://ts4.mm.bing.net/th?id=OIP.d9KeJDVFEDBgK5_EyzEDiwHaK_&pid=15.1',
    chargePerMinute: 60,
    isFree: false,
    specialty: 'Palmistry',
  },
  {
    id: 6,
    name: 'Astrologer F',
    image:
      'http://ts4.mm.bing.net/th?id=OIP.d9KeJDVFEDBgK5_EyzEDiwHaK_&pid=15.1',
    chargePerMinute: 0,
    isFree: true, // Currently offering free sessions
    specialty: 'Tarot Reading',
  },
  {
    id: 7,
    name: 'Astrologer G',
    image:
      'http://ts4.mm.bing.net/th?id=OIP.d9KeJDVFEDBgK5_EyzEDiwHaK_&pid=15.1',
    chargePerMinute: 80,
    isFree: false,
    specialty: 'Vedic Astrology',
  },
  {
    id: 8,
    name: 'Astrologer H',
    image:
      'http://ts4.mm.bing.net/th?id=OIP.d9KeJDVFEDBgK5_EyzEDiwHaK_&pid=15.1',
    chargePerMinute: 0,
    isFree: true, // Currently offering free sessions
    specialty: 'Western Astrology',
  },
];
export default Astrologers;

export const Reviews = [
  {
    id: 1,
    name: 'Rahul singh',
    image:
      'http://ts1.mm.bing.net/th?id=OIP.bFNFNtbodjO1HjAk4Ek-1QHaHa&pid=15.1',
    profession: 'TV Actor',
    review: 'An outstanding performer with a captivating presence on screen.',
    rating: 5, // 4.5 out of 5 stars
  },
  {
    id: 2,
    name: 'Rahul singh',
    image:
      'http://ts1.mm.bing.net/th?id=OIP.bFNFNtbodjO1HjAk4Ek-1QHaHa&pid=15.1',
    profession: 'Sports',
    review: 'A dedicated athlete who always brings her best to the field.',
    rating: 4, // 4.8 out of 5 stars
  },
  {
    id: 3,
    name: 'Rahul singh',
    image:
      'http://ts1.mm.bing.net/th?id=OIP.bFNFNtbodjO1HjAk4Ek-1QHaHa&pid=15.1',
    profession: 'Movie Director',
    review: 'A visionary director with a knack for storytelling.',
    rating: 5, // 4.7 out of 5 stars
  },
  {
    id: 4,
    name: 'Rahul singh',
    image:
      'http://ts1.mm.bing.net/th?id=OIP.bFNFNtbodjO1HjAk4Ek-1QHaHa&pid=15.1',
    profession: 'TV Actress',
    review: 'A talented actress known for her versatile roles.',
    rating: 4, // 4.9 out of 5 stars
  },
  {
    id: 5,
    name: 'Rahul singh',
    image:
      'http://ts1.mm.bing.net/th?id=OIP.bFNFNtbodjO1HjAk4Ek-1QHaHa&pid=15.1',
    profession: 'Musician',
    review: 'An amazing musician with a unique sound and style.',
    rating: 5, // 4.6 out of 5 stars
  },
];
export const services = [
  {
    id: 1,
    title: "Today's Panchang",
    icon: 'https://cdn-icons-png.flaticon.com/128/13258/13258799.png',
  },
  {
    id: 2,
    title: 'Janam Kundali',
    icon: 'https://cdn-icons-png.flaticon.com/128/9085/9085836.png',
  },
  {
    id: 3,
    title: 'Kundali Match',
    icon: 'https://cdn-icons-png.flaticon.com/128/4663/4663642.png',
  },
  {
    id: 4,
    title: 'Free Horoscope',
    icon: 'https://cdn-icons-png.flaticon.com/128/678/678901.png',
  },
  {
    id: 5,
    title: 'Shubh Muhurat',
    icon: 'https://cdn-icons-png.flaticon.com/128/2982/2982306.png',
  },
  {
    id: 6,
    title: 'Vrat and Upvaas',
    icon: 'https://cdn-icons-png.flaticon.com/128/4245/4245482.png',
  },
];
export const LiveAstrologers = [
  {
    image:
      'https://th.bing.com/th?id=OIP.XSZAFm-5JI7nriDLwZqRQQHaE7&w=306&h=203&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
    name: ' Jane Doe',
    topic: 'Daily Prediction',
    live: true,
  },
  {
    image:
      'https://th.bing.com/th?id=OIP.XSZAFm-5JI7nriDLwZqRQQHaE7&w=306&h=203&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',

    name: ' John Smith',
    topic: 'Career & Job',
    live: false,
  },
  {
    image:
      'https://th.bing.com/th?id=OIP.XSZAFm-5JI7nriDLwZqRQQHaE7&w=306&h=203&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',

    name: 'Emily Stone',
    topic: 'Love & Relationships',
    live: true,
  },
  {
    image:
      'https://th.bing.com/th?id=OIP.XSZAFm-5JI7nriDLwZqRQQHaE7&w=306&h=203&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',

    name: 'David Johnson',
    topic: 'Daily Prediction',
    live: false,
  },
  {
    image:
      'https://th.bing.com/th?id=OIP.XSZAFm-5JI7nriDLwZqRQQHaE7&w=306&h=203&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',

    name: 'Sarah Lee',
    topic: 'Career & Job',
    live: true,
  },
  {
    image:
      'https://th.bing.com/th?id=OIP.XSZAFm-5JI7nriDLwZqRQQHaE7&w=306&h=203&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',

    name: 'Michael Brown',
    topic: 'Love & Relationships',
    live: false,
  },
  {
    image:
      'https://th.bing.com/th?id=OIP.XSZAFm-5JI7nriDLwZqRQQHaE7&w=306&h=203&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',

    name: 'Rachel Adams',
    topic: 'Daily Prediction',
    live: true,
  },
  {
    image:
      'https://th.bing.com/th?id=OIP.XSZAFm-5JI7nriDLwZqRQQHaE7&w=306&h=203&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',

    name: 'William Davis',
    topic: 'Career & Job',
    live: true,
  },
  {
    image:
      'https://th.bing.com/th?id=OIP.XSZAFm-5JI7nriDLwZqRQQHaE7&w=306&h=203&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',

    name: 'Olivia Green',
    topic: 'Love & Relationships',
    live: false,
  },
];

export const Categories = [
  {
    id: 1,
    image:
      'https://th.bing.com/th/id/OIP.wNgfOmWhbZDCybRekbCGwAHaE8?w=252&h=180&c=7&r=0&o=5&pid=1.7',
    name: 'Vedic Astrology',
  },
  {
    id: 2,
    image:
      'https://th.bing.com/th/id/OIP.wNgfOmWhbZDCybRekbCGwAHaE8?w=252&h=180&c=7&r=0&o=5&pid=1.7',
    name: 'Tarot Reading',
  },
  {
    id: 3,
    image:
      'https://th.bing.com/th/id/OIP.wNgfOmWhbZDCybRekbCGwAHaE8?w=252&h=180&c=7&r=0&o=5&pid=1.7',
    name: 'Numerology ',
  },
  {
    id: 4,
    image:
      'https://th.bing.com/th/id/OIP.wNgfOmWhbZDCybRekbCGwAHaE8?w=252&h=180&c=7&r=0&o=5&pid=1.7',
    name: 'Marital Life',
  },
  {
    id: 5,
    image:
      'https://th.bing.com/th/id/OIP.wNgfOmWhbZDCybRekbCGwAHaE8?w=252&h=180&c=7&r=0&o=5&pid=1.7',
    name: 'Love & Relationship',
  },
  {
    id: 6,
    image:
      'https://th.bing.com/th/id/OIP.wNgfOmWhbZDCybRekbCGwAHaE8?w=252&h=180&c=7&r=0&o=5&pid=1.7',
    name: 'Career & Job',
  },
  {
    id: 7,
    image:
      'https://th.bing.com/th/id/OIP.wNgfOmWhbZDCybRekbCGwAHaE8?w=252&h=180&c=7&r=0&o=5&pid=1.7',
    name: 'Break-up & Divorce',
  },
  {
    id: 8,
    image:
      'https://th.bing.com/th/id/OIP.wNgfOmWhbZDCybRekbCGwAHaE8?w=252&h=180&c=7&r=0&o=5&pid=1.7',
    name: 'Psychic Reading',
  },
];

export const blogs = [
  {
    id: 1,
    image:
      'https://th.bing.com/th/id/OIP.Rsg_O8N1phZvePBJ1_faxwHaE7?w=242&h=180&c=7&r=0&o=5&pid=1.7',
    title: 'The Future of Technology',
    content:
      'Technology is evolving at a rapid pace, and its impact on our lives is profound. From AI to blockchain, the future holds immense possibilities...',
  },
  {
    id: 2,
    image:
      'https://th.bing.com/th/id/OIP.Rsg_O8N1phZvePBJ1_faxwHaE7?w=242&h=180&c=7&r=0&o=5&pid=1.7',
    title: 'Healthy Living Tips',
    content:
      'Living a healthy lifestyle involves more than just eating right. It includes physical activity, mental well-being, and maintaining balance in life...',
  },
  {
    id: 3,
    image:
      'https://th.bing.com/th/id/OIP.Rsg_O8N1phZvePBJ1_faxwHaE7?w=242&h=180&c=7&r=0&o=5&pid=1.7',
    title: 'Traveling the World on a Budget',
    content:
      'Travel doesn’t have to be expensive. With careful planning and the right mindset, you can explore the world without breaking the bank...',
  },
  {
    id: 4,
    image:
      'https://th.bing.com/th/id/OIP.Rsg_O8N1phZvePBJ1_faxwHaE7?w=242&h=180&c=7&r=0&o=5&pid=1.7',
    title: 'The Importance of Mental Health,body,exercise',
    content:
      'Mental health is just as important as physical health. In this blog, we explore ways to take care of your mental well-being...',
  },
  {
    id: 5,
    image:
      'https://th.bing.com/th/id/OIP.Rsg_O8N1phZvePBJ1_faxwHaE7?w=242&h=180&c=7&r=0&o=5&pid=1.7',
    title: 'The Rise of Remote Work',
    content:
      'Remote work has become more popular than ever. This blog delves into the benefits and challenges of working from home...',
  },
];
