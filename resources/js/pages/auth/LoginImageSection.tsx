import * as React from 'react';

const images = [
    'https://cdn.builder.io/api/v1/image/assets/33b41968e7754d2b98ae74310dc65b2e/93acd89be95a8edf03f84d36616acc4218bf0f8f?placeholderIfAbsent=true',
    'https://cdn.builder.io/api/v1/image/assets/33b41968e7754d2b98ae74310dc65b2e/596267ffe8e0221ce6d8af71d9f9d44e28a2d307?placeholderIfAbsent=true',
    'https://cdn.builder.io/api/v1/image/assets/33b41968e7754d2b98ae74310dc65b2e/dd9bbaa71857146f0f7c38b5bb30e1a80398cbba?placeholderIfAbsent=true',
];

export function LoginImageSection() {
    const [index, setIndex] = React.useState(0);

    // Cambiar imagen cada 10 segundos
    React.useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // 10 segundos

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative w-6/12 overflow-hidden max-md:ml-0 max-md:w-full">
            <div className="absolute inset-0 h-full w-full">
                {images.map((src, i) => (
                    <img
                        key={i}
                        src={src}
                        alt={`Slide ${i}`}
                        className={`absolute h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
                            i === index ? 'z-10 opacity-100' : 'z-0 opacity-0'
                        }`}
                    />
                ))}
            </div>
        </section>
    );
}
