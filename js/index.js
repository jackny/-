/**
 * Created by ncs on 2018/6/21.
 */
$(function () {
    /*动态的响应式轮播图*/
    banner();
    /*初始化页签*/
    initTab();
    /*初始化页面上的工具提示*/
    $('[data-toggle="tooltip"]').tooltip();
    productBox();
});
var banner = function () {
    /*
     * 1.模拟数据（从后台获取数据）【{}，{}】
     * 2.判断当前设备    screen 768px
     * 3.根据当前设备把数据转化成html（渲染）  拼接字符串
     *    3.1:点容器动态生成
     *    3.2:图片容器内容动态生成
     * 4.渲染到页面当中   html追加
     * 5.测试能否响应两种设备（移动和非移动） 监听页面尺寸改变，重新渲染
     * 6.移动端手势切换功能 （左滑和右滑）
     * */


    /*获取元素*/
    /*轮播图组件*/
    var $banner = $('.carousel');
    /*点容器*/
    var $point = $banner.find('.carousel-indicators');
    /*图片容器*/
    var $image = $banner.find('.carousel-inner');
    /*窗口对象*/
    var $window = $(window);

    /* 1.模拟数据（从后台获取数据）【{}，{}】*/
    var data = [
        {
            pcSrc: './img/slide1.jpg',
            mSrc: './img/slide1_s.jpg'
        },
        {
            pcSrc: './img/slide2.jpg',
            mSrc: './img/slide2_s.jpg'
        },
        {
            pcSrc: './img/slide3.jpg',
            mSrc: './img/slide3_s.jpg'
        },
        {
            pcSrc: './img/slide4.jpg',
            mSrc: './img/slide4_s.jpg'
        },
        {
            pcSrc: './img/slide5.jpg',
            mSrc: './img/slide5_s.jpg'
        },
        {
            pcSrc: './img/slide6.jpg',
            mSrc: './img/slide6_s.jpg'
        }
    ];

    /*渲染操作*/
    var render = function () {
        /*2.判断当前设备    screen 768px*/
        var isMobile = $window.width() < 768 ? true : false;
        /*3.根据当前设备把数据转化成html（渲染）  拼接字符串*/
        /* 3.1:点容器动态生成*/
        var pointHtml = '';

        /* 3.2:图片容器内容动态生成*/
        var imageHtml = '';
        /*根据数据拼接*/
        $.each(data, function (i, item) {
            /*点内容的拼接*/
            pointHtml += '<li data-target="#carousel-example-generic" data-slide-to="' + i + '"' + (i == 0 ? 'class="active"' : '') + '></li>';
            /*图片内容的拼接*/
            imageHtml += '<div class="item ' + (i == 0 ? 'active' : '') + '">';
            /*按需追加图片*/
            if (isMobile) {
                imageHtml += '<a href="#" class="m_img "> <img src="' + item.mSrc + '" alt="' + (i + 1) + '"></a>';
            }
            else {
                imageHtml += ' <a href="#" class="pc_img " style="background-image: url(' + item.pcSrc + ');"></a>';
            }
            imageHtml += '</div>'
        });
        /*.4渲染到页面当中   html追加*/
        // console.log(imageHtml)
        $point.html(pointHtml);
        $image.html(imageHtml);
    }
render();

    /* 5.测试能否响应两种设备（移动和非移动） 监听页面尺寸改变，重新渲染*/
    $window.on('resize', function () {
        render();
    }).trigger('resize');//trigger主动触发resize事件

    /*6.移动端手势切换功能 （左滑和右滑）*/
    /*jQuery绑定touch事件
     * 注意：在event对象中没有触摸点集合，originalEvent当中才有
     * */
    var startX = 0;
    var distanceX = 0;
    isMove = false;
    $banner.on('touchstart', function (e) {
        startX = e.originalEvent.touches[0].clientX;
        // console.log(startX);
    }).on('touchmove', function (e) {
        var moveX = e.originalEvent.touches[0].clientX;
        distanceX = moveX - startX;
        isMove = true;
    }).on('touchend', function (e) {
        /*手势条件
         * 1.滑动过
         * 2.滑动距离超过50px
         * */
        /*判断是否满足手势条件*/
        if (isMove && Math.abs(distanceX) > 50)
        {
            /*右滑 上一张*/
            if (distanceX > 0) {
                $banner.carousel('prev');
            }
            /*左滑 下一张*/
            else {
                $banner.carousel('next');
            }
        }
        /*重置*/
        startX = 0;
        distanceX = 0;
        isMove = false;
    });
    $banner.carousel({
        interval:3000
    });
};
var initTab=function () {
    /*
    * 1.设置所有页签在一行显示  设置父容器的宽度是所有子容器的宽度之和
    *
    * 2.满足区域滚动的html结构要求 必须有大容器套小容器
    *
    * 3.实现滑动功能   使用区域滚动插件iscroll
    * */
    /*父容器*/
    var tabs=$('.wjs_product .nav-tabs');
    /*子容器*/
    var liList=tabs.find('li');
    /*计算宽度之和*/
    var width=0;
    $.each(liList,function (i,item) {
        /*内容的宽度*/
        /*innerWidth 内容和内边距的宽度*/
        /*outerWidth  内容和内边距和边框的宽度*/
        /*outerWidth（true）  内容和内边距和边框和外边距的宽度*/
        width+=$(item).outerWidth(true);
    });
    tabs.width(width);
    /*2.满足区域滚动的html结构要求 必须有大容器套小容器*/
    /*3实现滑动功能   使用区域滚动插件iscroll*/
    new IScroll('.nav-tabs-parent',{
        scrollX:true,
        scrollY:false
    });
}
/*产品盒子*/
var productBox=function () {
  var box=$(".product_box");
  box.each(function (i,item) {
      $(item).click(function () {
          for(var j=0;j<box.length;j++)
          {
             $(box[j]).removeClass("active");
          }
          $(this).addClass("active");
      });
  })
}
