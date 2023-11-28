const UltimateS = (function(){
    
    gsap.registerPlugin(ScrollTrigger);
    // intro mousemove event
    const introBG = document.querySelector(".the-ultimate-s2023--intro");
    introBG.addEventListener("mousemove",function(e){
        const introBGImg = introBG.querySelector(".the-ultimate-s2023-section__background img");
        let itemOffsetX = (e.clientX - (introBG.offsetWidth / 2)) * 0.01;
        let itemOffsetY = (e.clientY - (introBG.offsetHeight / 2)) * 0.025;
        introBGImg.style.transform = `scale(1.03) translate(${itemOffsetX}px,${itemOffsetY}px)`;
    });

    // intro 열기
    const introOpen = gsap.timeline({
        scrollTrigger: {
            trigger: introBG,
            start: "top top",
            end: `+=${introBG.offsetHeight * 2}`,
            pin:false,
            scrub: true
        }
    })
    introOpen.addLabel('a')
             .to(introBG,{y:"-100%", duration:5},'a')
             .from(".the-ultimate-s2023-section__video",{autoAlpha:0,duration:1,delay:1},'a');

    ScrollTrigger.create({
        trigger: ".the-ultimate-s2023--intro",
        start: `60% top`,
        end: `60% top`,
        scrub: true,
        onLeave:function(){
            document.querySelectorAll(".the-ultimate-s2023--video video").forEach((item)=>{
                item.play();
            })
        },
        onEnterBack:function(){
            document.querySelectorAll(".the-ultimate-s2023--video video").forEach((item)=>{
                item.pause();
            })
        }
    });

    // 비디오 멈췄다가 보이면 재생

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
  

    // io animation
    let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const targetElement = entry.target;
            if (entry.isIntersecting) {
                targetElement.classList.add("active");
            } else {
                targetElement.classList.remove("active");
            }
        });
    });
    
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

    
    
    // secret 백그라운드 스크롤 효과
    const secretBG = document.querySelector(".the-ultimate-s2023--secret .the-ultimate-s2023-section__background img")
    const secret = gsap.timeline({
        scrollTrigger:{
            trigger:".the-ultimate-s2023--secret",
            start:"top 30%",
            end:"40% 50%",
            scrub:true
        }
    });
    secret.from(secretBG,{y:"-20%",scale:1.1, autoAlpha:0.6});

    // secret 영역 카드 애니메이션
    const secretCard = gsap.timeline({
        scrollTrigger: {
            trigger: ".the-ultimate-s2023--secret__list-wrapper",
            start: "top top",
            end: `+=${5*document.documentElement.offsetHeight}`,
            pin:true,
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
        secretCard
              .from(title,{autoAlpha:0,y:25})
              .from(desc,{autoAlpha:0,y:25});
    });

    // resize시 맨위로 
    // window.addEventListener("resize",function(){
    //     this.scrollTo({
    //         top:0
    //     });
    // });

})();