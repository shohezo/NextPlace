/* drawer */
$(function () {
  $(".bl_drawerBtn").on("click", function () {
    $(this).toggleClass("action");
    $(".bl_drawer").toggleClass("action");
    $("body").toggleClass("noscroll");
  });
});
$(function () {
  //.bl_drawer_itemを押すとついてたactionが外れてドロワーメニューがひっこむ
  $(".bl_drawer_item a").on("click", function () {
    $(".bl_drawerBtn").toggleClass("action");
    $(".bl_drawer").toggleClass("action");
    $("body").toggleClass("noscroll");
  });
});
//スクロールトップ
jQuery(window).on("scroll", function () {
  if (jQuery("#news").height() < jQuery(this).scrollTop()) {
    jQuery(".el_pageTop").addClass("show");
  } else {
    jQuery(".el_pageTop").removeClass("show");
  }
});

//スムーススクロール
$(function () {
  $('a[href^="#"]').click(function () {
    var adjust = 0;
    var speed = 400;
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? "html" : href);
    var position = target.offset().top + adjust;
    $("body,html").animate({ scrollTop: position }, speed, "swing");
    return false;
  });
});

//セクションスクロール
var current;
$.scrollify({
  section: ".box",
  setHeights: false,
  scrollbars: false,
  updateHash: false, //URLの末尾に#◯をつけるか
  // interstitialSection: true,
  before: function (i, box) {
    current = i;
    $(".pagenation .active").removeClass("active");
    $(".pagenation").find("a").eq(i).addClass("active");
  },
  afterRender: function () {
    var pagenation = '<ul class="pagenation">';
    $(".box").each(function (i) {
      pagenation += "<li><a></a></li>";
    });
    pagenation += "</ul>";
    $("body").append(pagenation);
    $(".pagenation a").each(function (i) {
      $(this).on("click", function () {
        $.scrollify.move(i);
      });
    });
    $(".pagenation li:first-child").find("a").addClass("active");
  },
});
$(window).on("resize", function () {
  if (current) {
    var currentScrl = $(".box").eq(current).offset().top;
    $(window).scrollTop(currentScrl);
  }
});

//セクション毎のヘッダーパーツの色の変化
function changeColor() {
  var timing = 40; //変化するタイミングを微調整する

  var scrollY = window.pageYOffset;
  var body = document.body;

  var trigger0 = document.getElementById("fv");
  var trigger1 = document.getElementById("about");
  var trigger2 = document.getElementById("service");
  var trigger3 = document.getElementById("message");
  var trigger4 = document.getElementById("company");
  var trigger5 = document.getElementById("recruit");
  var trigger6 = document.getElementById("contact");

  var trigger0Y = trigger0.getBoundingClientRect().top; // ウィンドウ上からの要素の位置
  var trigger1Y = trigger1.getBoundingClientRect().top; // ウィンドウ上からの要素の位置
  var trigger2Y = trigger2.getBoundingClientRect().top;
  var trigger3Y = trigger3.getBoundingClientRect().top;
  var trigger4Y = trigger4.getBoundingClientRect().top;
  var trigger5Y = trigger5.getBoundingClientRect().top;
  var trigger6Y = trigger6.getBoundingClientRect().top;

  // 白背景以外の時はbodyの.bg-is-whiteを削除
  // 白背景の時はbodyに.bt-is-whiteを付与
  if (trigger2Y - timing > 0 && 0 >= trigger1Y - timing) {
    body.classList.add("bg-is-blue");
  } else if (trigger4Y - timing > 0 && 0 >= trigger3Y - timing) {
    body.classList.add("bg-is-blue");
  } else if (trigger6Y - timing > 0 && 0 >= trigger5Y - timing) {
    body.classList.add("bg-is-blue");
  } else {
    body.classList.remove("bg-is-blue");
  }
}

//fv以降はnewsbox非表示
window.addEventListener("scroll", changeColor);

$(function () {
  $(window).on("scroll", function () {
    if ($(".ly_fv").height() <= $(this).scrollTop()) {
      $(".bl_newsbox").addClass("none");
      $(".el_info").addClass("none");
    } else {
      $(".bl_newsbox").removeClass("none");
      $(".el_info").removeClass("none");
    }
  });
});
