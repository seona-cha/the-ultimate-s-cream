const UltimateS = (function(){
    
    gsap.registerPlugin(ScrollTrigger);
    
    // intro mousemove event
    const introBG = document.querySelector(".the-ultimate-s2023--intro");
    introBG.addEventListener("mousemove",function(e){
        const introBGImg = introBG.querySelector(".the-ultimate-s2023-section__background img");
        const particles = introBG.querySelectorAll(".particle");
        let itemOffsetX = (e.clientX - (introBG.offsetWidth / 2)) * 0.005;
        let itemOffsetY = (e.clientY - (introBG.offsetHeight / 2)) * 0.015;
        let dataValue = 0;
        particles.forEach((item)=>{
            dataValue = item.getAttribute('data-value');
            const particle = item.querySelector('img');
            let particleX = itemOffsetX * dataValue * 0.2;
            let particleY = itemOffsetY * dataValue * 0.15;
            particle.style.transform = `translate(${particleX}px,${particleY}px)`;
        });
        introBGImg.style.transform = `scale(1.02) translate(${itemOffsetX}px,${itemOffsetY}px)`;
    });

    // intro 열기
    const introOpen = gsap.timeline({
        scrollTrigger: {
            trigger: introBG,
            start: "top top",
            end: `+=${introBG.offsetHeight * 1.2}`,
            scrub: true
        }
    })
    introOpen.addLabel('a')
             .from(".the-ultimate-s2023-section__video",{autoAlpha:0,duration:1},'a');


    // 비디오 멈췄다가 보이면 재생
    ScrollTrigger.create({
        trigger: ".the-ultimate-s2023--intro",
        start: `5% top`,
        end: `60% top`,
        onLeave:function(){
            document.querySelectorAll(".the-ultimate-s2023--video video").forEach((item)=>{
                item.play();
            })
        },
        onLeaveBack:function(){
            document.querySelectorAll(".the-ultimate-s2023--video video").forEach((item)=>{
                item.pause();
                item.currentTime = 0;
            })
        }
    });

    // 비디오 자막 버튼
    const videoDescBtn = document.querySelector(".the-ultimate-s2023-video__button");
    const videoDesc = document.querySelector(".the-ultimate-s2023-video__description__wrapper");
    
    videoDescBtn.addEventListener("click", function(){
        toggleClass(videoDescBtn,"desc-open","desc-close");
        toggleClass(videoDesc,"closed","open");
    });
    
    function toggleClass(element, class1, class2){
        if(element.classList.contains(class1)){
            element.classList.remove(class1);
            element.classList.add(class2);
        }else if(element.classList.contains(class2)){
            element.classList.remove(class2);
            element.classList.add(class1);
        }
    };
  
    // marquee 배너
    const marquee = document.querySelector('.marquee-text span');
    const copyText = marquee.innerHTML;
    let count = 0;
    for(let i = 0; i < 13; i++){
        marquee.innerHTML += " " + copyText;
    }
    function marqueeText(element){
        if(count > element.scrollWidth / 2){
            element.style.transform = 'translateX(0px)';
            count = 0;
        }
        element.style.transform = `translateX(${count * -1}px)`;
    }
    function marqueeAni(){
        window.requestAnimationFrame(marqueeAni);
        
        count++;
        marqueeText(marquee);
    }
    marqueeAni();
    

    // io animation
    let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const targetElement = entry.target;
            if (entry.isIntersecting) {
                targetElement.classList.add("active");
            }
        });
    },{threshold:0.2});
    
    const observeItems = document.querySelectorAll(".observe-item");
    observeItems.forEach((element) => {
        observer.observe(element);
    });

    // odometer
    const odometer = document.querySelectorAll(".odometer");
    let observer2 = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setTimeout(function(){
                    odometer[0].innerHTML = 40.4;
                    odometer[1].innerHTML = 22.4;
                    odometer[2].innerHTML = 18.5;
                    odometer[3].innerHTML = 22.6;
                    odometer[4].innerHTML = 8.6;
                }, 100);
            } else {
                setTimeout(function(){
                    odometer[0].innerHTML = 0;
                    odometer[1].innerHTML = 0;
                    odometer[2].innerHTML = 0;
                    odometer[3].innerHTML = 0;
                    odometer[4].innerHTML = 0;
                }, 100);
            }
        });
    });
    
    const odometerItems = document.querySelectorAll(".observe-odometer");
    odometerItems.forEach((element) => {
        observer2.observe(element);
    });


    const secretTitles = document.querySelectorAll(".the-ultimate-s2023--secret__title span");
    const text0 = secretTitles[0].innerHTML.split("");
    const text1 = secretTitles[1].innerHTML.split("");
    const text2 = secretTitles[2].innerHTML.split("");
    const text = [text0, text1, text2];
    secretTitles.forEach((element)=>{
        element.innerHTML = "";
    })

    let isRunning = false;
    let observer3 = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                if (isRunning) {
                    return;
                } else {
                    secretTitles.forEach((element, index) => {
                        let typingText = '';
                        let i = 0;
                        let intervalId; // Variable to store the interval ID
                        function run() {
                            isRunning = true;
        
                            intervalId = setInterval(() => {
                                if (i == text[index].length) {
                                    clearInterval(intervalId);
                                } else {
                                    typingText += text[index][i];
                                    element.innerHTML = typingText;
                                    i++;
                                }
                            }, 110);
                        }
                        setTimeout(run, 800 * index);
                    });
                }
            }
        });
    });
    const secretTitle = document.querySelectorAll(".the-ultimate-s2023--secret__title");
    secretTitle.forEach((element) => {
        observer3.observe(element);
    });

    // lifting 스크롤시
    const liftingSection = document.querySelector(".the-ultimate-s2023--lifting");
    const graphLine = document.querySelector(".the-ultimate-s2023--lifting .the-ultimate-s2023-image");
    const liftingItem = document.querySelectorAll(".the-ultimate-s2023--lifting .the-ultimate-s2023--lifting__item");

    const lifting = gsap.timeline({
        scrollTrigger:{
            trigger:liftingSection,
            start:"25% 45%",
            end:"80% 55%",
            scrub:true
        }
    })
    lifting.addLabel('a')
           .from(graphLine,{autoAlpha:0,height:0,duration:5},'a');
    liftingItem.forEach((item,index)=>{
        lifting.fromTo(item,{autoAlpha:0,y:10},{autoAlpha:1,y:0,delay:index+1,duration:1},'a');
    });
   

    // secret 타이핑, 백그라운드 효과
    
    const secretBG = document.querySelector(".the-ultimate-s2023--secret .the-ultimate-s2023-section__background img")
    const secret = gsap.timeline({
        scrollTrigger:{
            trigger:".the-ultimate-s2023--secret",
            start:"top 50%",
            end:"10% 50%",
            scrub:true
        }
    });
    secret.from(secretBG,{y:"-20%",scale:1.1, autoAlpha:0.6});

    // secret 영역 카드 애니메이션
    const secretCard = gsap.timeline({
        scrollTrigger: {
            trigger: ".the-ultimate-s2023--secret__list-wrapper",
            start: "top top",
            end: `100% 100%`,
            pin:false,
            scrub: true
        }
    });
    const secretItems = document.querySelectorAll(".the-ultimate-s2023--secret__item");
    secretItems.forEach((item, index)=>{
        const prevItem = secretItems[index-1];
        const wrapper = item.querySelector(".item__wrapper");
        const title = item.querySelector(".item__inner");
        const desc = item.querySelector(".item__desc");
        const bgImg = item.querySelector(".item__background img");
    
        secretCard.addLabel('a');
        if(index > 0){
            secretCard.to(prevItem,{autoAlpha:0,scale:0.96,duration:3},'a')
                      .to(item,{autoAlpha:1,delay:2,duration:2},'a')
                      .from(wrapper,{y:"15%",delay:2,duration:2},'a')
                      .from(bgImg,{scale:1.15,delay:2,duration:2},'a');
        }else{
            secretCard.to(item,{autoAlpha:1,duration:2},'a')
                      .from(wrapper,{y:"15%",duration:2},'a')
                      .from(bgImg,{scale:1.15},'a');
        }
        secretCard.from(title,{autoAlpha:0,y:25})
                  .from(desc,{autoAlpha:0,y:25});
    });

    window.addEventListener("scroll",function(){
        let curr = window.scrollY;

        // cream 영역 particles
        const creamStart = document.querySelector(".the-ultimate-s2023--cream").offsetTop - (document.documentElement.offsetHeight / 2);
        const creamEnd = document.querySelector(".the-ultimate-s2023--cream").offsetTop + document.querySelector(".the-ultimate-s2023--cream").offsetHeight - (document.documentElement.offsetHeight / 2);
        const creamCurr = window.scrollY - creamStart;
        const particle = document.querySelectorAll(".the-ultimate-s2023--cream .particle");

        if(curr > creamStart && curr < creamEnd){
            particle[0].style.transform = `rotate(${creamCurr * -0.2}deg)`;
            particle[1].style.transform = `rotate(${creamCurr * 0.4}deg)`;
        }

        // marquee 배너 값 조정
        count+=10;
        
        // display 모션
        const scrollYBottom = window.scrollY + document.documentElement.clientHeight * 0.8;
        const displayTop = document.querySelector('.the-ultimate-s2023--display').offsetTop;
        const displayItem = document.querySelectorAll('.the-ultimate-s2023--display__item');
        // (1) scale 조정
        let firstOffsetTop = displayTop + displayItem[0].offsetTop;
        let firstOffsetHeight = displayItem[0].offsetHeight;
        let firstScale = 1.2;
        if(scrollYBottom > firstOffsetTop && scrollYBottom < firstOffsetTop + firstOffsetHeight){
            firstScale = 1.2 - 0.2 * (scrollYBottom - firstOffsetTop) / firstOffsetHeight ;
            displayItem[0].querySelector('img').style.transform = `scale(${firstScale})`;
        }
        // (2) 뚜껑 열고닫기
        let secondOffsetTop = displayTop + displayItem[1].offsetTop;
        let secondOffsetHeight = displayItem[1].offsetHeight;
        let secondCapX = -52;
        let secondCapY = 53;
        let secondCapR = -17;
        if(scrollYBottom > secondOffsetTop && scrollYBottom < secondOffsetTop + secondOffsetHeight){
            secondCapX = -13 + (13 * (scrollYBottom - secondOffsetTop) / secondOffsetHeight) ;
            secondCapY = 20 - (20 * (scrollYBottom - secondOffsetTop) / secondOffsetHeight) ;
            secondCapR = -17 + (17 * (scrollYBottom - secondOffsetTop) / secondOffsetHeight) ;
            displayItem[1].querySelector('.cap').style.transform = `translate(${secondCapX}%,${secondCapY}%) rotate(${secondCapR}deg)`;
        }
        // (3) 무중력
        let thirdOffsetTop = displayTop + displayItem[2].offsetTop;
        let thirdOffsetHeight = displayItem[2].offsetHeight;
        let thirdX = 0;
        let thirdR = 0;
        if(scrollYBottom > thirdOffsetTop && scrollYBottom < thirdOffsetTop + thirdOffsetHeight){
            thirdX = (17 * (scrollYBottom - thirdOffsetTop) / thirdOffsetHeight) ;
            thirdR = (8 * (scrollYBottom - thirdOffsetTop) / thirdOffsetHeight) ;
            displayItem[2].querySelector('picture img:nth-child(1)').style.transform = `translateX(${thirdX / 2}%) rotate(${thirdR}deg)`;
            displayItem[2].querySelector('picture img:nth-child(2)').style.transform = `translateX(-${thirdX}%) rotate(-${thirdR / 2}deg)`;
        }
        // (4) 굴러오기
        let fourthOffsetTop = displayTop + displayItem[3].offsetTop;
        let fourthOffsetHeight = displayItem[3].offsetHeight;
        let fourthX = 50;
        let fourthScale = 0.7;
        if(scrollYBottom > fourthOffsetTop && scrollYBottom < fourthOffsetTop + fourthOffsetHeight){
            fourthX = 50 - (50 * (scrollYBottom - fourthOffsetTop) / fourthOffsetHeight) ;
            fourthScale = 0.7 + (0.3 * (scrollYBottom - fourthOffsetTop) / fourthOffsetHeight) ;
            displayItem[3].querySelector('picture img:nth-child(1)').style.transform = `scale(${fourthScale})`;
            displayItem[3].querySelector('picture img:nth-child(2)').style.transform = `translateX(${fourthX}%)`;
        }
    })

    window.addEventListener("resize", ScrollTrigger.update);

})();
