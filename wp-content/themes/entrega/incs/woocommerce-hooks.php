<?php

// disabled woocommerce styles
add_filter( 'woocommerce_enqueue_styles', '__return_false' );

// удаление ссылки на товар со страницы категории
remove_action( 'woocommerce_before_shop_loop_item', 'woocommerce_template_loop_product_link_open', 10 );
remove_action( 'woocommerce_after_shop_loop_item', 'woocommerce_template_loop_product_link_close', 5 );
// открепляем заголовок и flash в карточеке товара
remove_action( 'woocommerce_before_shop_loop_item_title', 'woocommerce_show_product_loop_sale_flash', 10 );
remove_action( 'woocommerce_shop_loop_item_title', 'woocommerce_template_loop_product_title', 10 );
remove_action( 'woocommerce_after_shop_loop_item_title', 'woocommerce_template_loop_price', 10 );

remove_action( 'woocommerce_before_shop_loop', 'woocommerce_result_count', 20 );
remove_action( 'woocommerce_before_shop_loop', 'woocommerce_catalog_ordering', 30 );
remove_action( 'woocommerce_before_shop_loop', 'woocommerce_output_all_notices', 10 );

add_action( 'woocommerce_shop_loop_item_title', function () {
	global $product;
	echo '<h3> <a href="' . $product->get_permalink() . '">' . $product->get_title() . '</a></h3>';
} );

add_filter( 'woocommerce_add_to_cart_fragments', function ( $fragments ) {
	$fragments['span.cart-badge'] = '<span class="cart-badge">' . WC()->cart->get_cart_contents_count() . '</span>';

	return $fragments;
} );

add_filter( 'woocommerce_breadcrumb_defaults', 'jk_woocommerce_breadcrumbs' );
function jk_woocommerce_breadcrumbs() {
	return array(
		'delimiter'   => ' <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg"> 
 <path d="M1.5 11.5L6.5 6.5L1.5 1.5" stroke="#A4FF01" stroke-linecap="square"/>
</svg>
 ',
		'wrap_before' => '<nav class="woocommerce-breadcrumb" itemprop="breadcrumb">',
		'wrap_after'  => '</nav>',
		'before'      => '',
		'after'       => '',
		'home'        => _x( 'Home', 'breadcrumb', 'woocommerce' ),
	);
}

function entrega_get_shop_thumb() {
	$html = '';
	if ( is_product_category() ) {
		global $wp_query;
		$cat          = $wp_query->get_queried_object();
		$thumbnail_id = get_term_meta( $cat->term_id, 'thumbnail_id', true );
		$image        = wp_get_attachment_url( $thumbnail_id );
		if ( $image ) {
			$html .= '<img src="' . $image . '" alt="' . $cat->name . '" />';
		}
	}

	return $html;
}

remove_action( 'woocommerce_before_shop_loop', 'woocommerce_output_all_notices', 10 );

remove_action( 'woocommerce_shop_loop_subcategory_title', 'woocommerce_template_loop_category_title', 10 );
add_action( 'woocommerce_shop_loop_subcategory_title', function ( $category ) {
	echo "<h3>$category->name</h3>";
} );
//
//add_action('template_redirect', function () {
//	if (is_product()) {
//		remove_action('woocommerce_sidebar', 'woocommerce_get_sidebar', 10);
//	}
//});
