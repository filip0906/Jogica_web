document.addEventListener('DOMContentLoaded', () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "EntertainmentBusiness",
        "name": "Jogica - Dječja Rođendaonica i Igraonica",
        "image": "Jogica2png-removebg-preview.png",
        "url": "https://www.jogica.com.hr",
        "telephone": "+385915141926",
        "email": "jogica.rodjendani@gmail.com",
        "priceRange": "€€",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Vojakovačka 39",
            "addressLocality": "Zagreb",
            "postalCode": "10000",
            "addressCountry": "HR"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 45.7905,
            "longitude": 15.9340
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"],
            "opens": "16:00",
            "closes": "20:00"
        },
        "sameAs": [
            "https://www.instagram.com/jogica_rodjendani"
        ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
});
