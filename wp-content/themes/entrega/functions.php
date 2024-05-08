<?php
//https://developer.woocommerce.com/docs/classic-theme-development-handbook/

add_action( 'after_setup_theme', function () {
	add_theme_support( 'woocommerce' );
	add_theme_support( 'wc-product-gallery-zoom' );
	add_theme_support( 'wc-product-gallery-lightbox' );
	add_theme_support( 'wc-product-gallery-slider' );
	add_theme_support( 'title-tag' );

	register_nav_menus(
		array(
			'header_menu' => 'Меню в шапке',
			'footer_menu_clients' => 'Меню в подвале клиентам',
			'footer_menu_about' => 'Меню в подвале о компании',
		)
	);

} );

// channge content wrapper
//remove_action( 'woocommerce_before_main_content', 'woocommerce_output_content_wrapper' );
//remove_action( 'woocommerce_after_main_content', 'woocommerce_output_content_wrapper_end' );

require_once get_template_directory() . '/incs/woocommerce-hooks.php';
require_once get_template_directory() . '/incs/cpt.php';


add_action( 'wp_enqueue_scripts', 'true_enqueue_js_and_css' );

function true_enqueue_js_and_css() {
	wp_enqueue_style( 'custom-select', get_template_directory_uri() . '/assets/css/custom-select.css', '1.0' );
	wp_enqueue_style( 'swiper-style', get_template_directory_uri() . '/assets/css/swiper-bundle.min.css', '1.0' );
	wp_enqueue_style( 'main-style', get_template_directory_uri() . '/assets/css/style.css', '1.0' );

	wp_enqueue_script( 'jquery' );
	wp_enqueue_script( 'custom-select', get_template_directory_uri() . '/assets/js/custom-select.min.js', array(), false, true );
	wp_enqueue_script( 'sticky-header', get_template_directory_uri() . '/assets/js/sticky-header.js', array(), false, true );
	wp_enqueue_script( 'swiper', get_template_directory_uri() . '/assets/js/swiper-bundle.min.js', array(), false, true );
	wp_enqueue_script( 'accordion', get_template_directory_uri() . '/assets/js/accordion.min.js', array(), false, true );
	wp_enqueue_script( 'yandex-map', get_template_directory_uri() . '/assets/js/map.js', array(), false, true );
	wp_enqueue_script( 'imask-script', get_template_directory_uri() . '/assets/js/imask.js', array(), false, true );
	wp_enqueue_script( 'parallax-script', get_template_directory_uri() . '/assets/js/parallax.min.js', array(), false, true );
	wp_enqueue_script( 'main-script', get_template_directory_uri() . '/assets/js/index.js', array(), false, true );
}

// регистрируем тип записей Новости
function register_news_entities() {
	$news_args = array(
		'public'        => true,
		'label'         => null,
		'labels'        => array(
			'name'               => 'Новости',
			'singular_name'      => 'Новость',
			'add_new'            => 'Добавить новость',
			'add_new_item'       => 'Добавление новости',
			'edit_item'          => 'Редактирование новости',
			'new_item'           => 'Новая новость',
			'view_item'          => 'Смотреть новость',
			'search_items'       => 'Искать новости',
			'not_found'          => 'Не найдено',
			'not_found_in_trash' => 'Не найдено в корзине',
			'parent_item_colon'  => '',
			'menu_name'          => 'Новости',
		),
		'menu_position' => 5,
		'menu_icon'     => 'dashicons-welcome-widgets-menus',
		'rewrite'       => array( 'slug' => 'news' ),
		'has_archive'   => true
	);
	register_post_type( 'news', $news_args );
}

add_action( 'init', 'register_news_entities' );

add_action('widgets_init', function() {
	register_sidebar( array(
		'name'          => __('Sidebar',  'entrega'),
		'id'            => "sidebar-1",
		'description'   => '',
		'class'         => '',
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget'  => "</div>\n",
		'before_title'  => '<h2 class="widgettitle">',
		'after_title'   => "</h2>\n",
		'before_sidebar' => '', // WP  5.6
		'after_sidebar'  => '', // WP 5.6
	) );
});

// изменение сепаратор в breadcrumbs youst seo
function filter_wpseo_breadcrumb_separator($this_options_breadcrumbs_sep) {
	return '<svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg"> 
 <path d="M1.5 11.5L6.5 6.5L1.5 1.5" stroke="#A4FF01" stroke-linecap="square"></path>
</svg>';
};

// add the filter
add_filter('wpseo_breadcrumb_separator', 'filter_wpseo_breadcrumb_separator', 10, 1);