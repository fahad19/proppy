(function () {
  function endUrlWithSlash(url) {
    if (url.endsWith('/')) {
      return url;
    }

    return url + '/';
  }

  const currentPath = endUrlWithSlash(window.location.pathname);

  // active top nav links
  const $topNavLinks = $('nav .navbar-start a');
  $topNavLinks.each(function () {
    const url = endUrlWithSlash($(this).attr('href'));

    if (currentPath.indexOf(url) > -1) {
      $topNavLinks.removeClass('is-active');
      $(this).addClass('is-active');
    }
  });

  // active sidebar links
  const $asideLinks = $('aside.menu.docs > ul > li > a');
  $asideLinks.each(function () {
    const url = endUrlWithSlash($(this).attr('href'));

    if (currentPath.indexOf(url) > -1) {
      $asideLinks.removeClass('is-active');
      $(this).addClass('is-active');

      // mount TOC in sidebar from content area
      const $lists = $('.content ul');

      if ($lists.length === 0) {
        // is not TOC
        return;
      }

      if (!$($lists[0]).find('li:first-child').html().startsWith('<a')) {
        // is not TOC
        return;
      }

      const $toc = $($lists[0]);
      $toc.hide();
      $(this).after('<ul>' + $toc.html() + '</ul>');
    }
  });

  // anchors with image
  $('a > img').parent().addClass('has-image');

  // flow
  (function handleFlow() {
    const $flow = $('.flow');

    if ($flow.length === 0) {
      return;
    }

    $flow.find('ul li').hide();

    function handleList(selector, className, interval, delay) {
      const list = $flow.find(selector);
      list.hide();

      let current = 0;
      list.eq(0).show();

      setTimeout(function () {
        setInterval(function () {
          const toHide = current;
          const toShow = (current + 1) > (list.length - 1)
            ? 0
            : (current + 1);

          list.eq(toHide).hide().removeClass('animated ' + className);
          list.eq(toShow).show().addClass('animated ' + className);

          current = toShow;
        }, interval);
      }, delay);
    }

    handleList('.first li', 'bounceInUp', 4000, 0);
    handleList('.third li', 'bounceInDown', 4000, 2000);
  })();

  // examples
  (function () {
    const $examples = $('.examples');

    if ($examples.length === 0) {
      return;
    }

    const $toggler = $('.toggler input');
    function handleToggle($t) {
      if ($t.is(':checked')) {
        $('.with-proppy').show();
        $('.without-proppy').hide();
      } else {
        $('.with-proppy').hide();
        $('.without-proppy').show();
      }
    }
    $toggler.on('change', function (e) {
      handleToggle($(this));
    });
    handleToggle($toggler);

    const $tabContent = $examples.find('.tab-content > div');
    $tabContent.hide();
    const $links = $examples.find('.menu-list a');

    $links.on('click', function (e) {
      e.preventDefault();

      if ($(this).attr('data-disable-toggler') === 'true') {
        $('.toggler').hide();
      } else {
        $('.toggler').show();
      }

      $links.removeClass('is-active');
      $(this).addClass('is-active');

      $tabContent.hide();
      $($(this).attr('href')).show();

      return false;
    });

    $links.first().trigger('click');
  })();

  // snippet tabs
  $('.tabs.for-snippet').each(function () {
    $(this).find('li a').on('click', function (e) {
      e.preventDefault();

      const contentSelector = $(this).attr('href');
      $(this).parents('ul').find('li').removeClass('is-active');
      $(this).parent().addClass('is-active');

      $(this).parents('.tabs').next().find('pre').hide();
      $(this).parents('.tabs').next().find(contentSelector).show();

      return false;
    });

    $(this).find('a').first().trigger('click');
  });
})();
