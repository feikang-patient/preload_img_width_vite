const arr = [
    'http://localhost:8081/img1.jpg',
    'http://localhost:8081/img2.jpg',
    'http://localhost:8081/img3.jpg',
    'http://localhost:8081/img4.jpg',
    'http://localhost:8081/img5.jpg',
    'http://localhost:8081/img6.jpg',
    'http://localhost:8081/img7.jpg',
    'http://localhost:8081/img8.jpg',
    'http://localhost:8081/img9.jpg'
];

export async function preloadImages(max = 3) {
    const images = [...arr];
    function preloadImage() {
        const src = images.shift();
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
            link.onload = resolve;
            link.onerror = reject;
            setTimeout(resolve, 10000);
        });
    }
    // function _load() {
    //     preloadImage().finally(() => {
    //         if (images.length > 0) {
    //             _load();
    //         }
    //     });
    // }

    // for (let i = 0; i < max; i++) {
    //     preloadImage();
    //     _load();
    // }
    for (let i = 0; i < 9; i++) {
        preloadImage();
    }
}
