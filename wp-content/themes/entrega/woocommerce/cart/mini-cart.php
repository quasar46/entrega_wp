<?php
/**
 * Mini-cart
 *
 * Contains the markup for the mini-cart, used by the cart widget.
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/cart/mini-cart.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 7.9.0
 */
global $product;

defined( 'ABSPATH' ) || exit;
do_action( 'woocommerce_before_mini_cart' ); ?>

    <div class="widget_shopping_cart_content">

		<?php if ( ! WC()->cart->is_empty() ) : ?>

            <div class="woocommerce-mini-cart cart_list product_list_widget offcanvas__items <?php echo esc_attr( $args['list_class'] ); ?>">
				<?php

				do_action( 'woocommerce_before_mini_cart_contents' );

				foreach ( WC()->cart->get_cart() as $cart_item_key => $cart_item ) {
					$_product   = apply_filters( 'woocommerce_cart_item_product', $cart_item['data'], $cart_item, $cart_item_key );
					$product_id = apply_filters( 'woocommerce_cart_item_product_id', $cart_item['product_id'], $cart_item, $cart_item_key );

					if ( $_product && $_product->exists() && $cart_item['quantity'] > 0 && apply_filters( 'woocommerce_widget_cart_item_visible', true, $cart_item, $cart_item_key ) ) {
						$product_name      = apply_filters( 'woocommerce_cart_item_name', $_product->get_name(), $cart_item, $cart_item_key );
						$thumbnail         = apply_filters( 'woocommerce_cart_item_thumbnail', $_product->get_image(), $cart_item, $cart_item_key );
						$product_price     = apply_filters( 'woocommerce_cart_item_price', WC()->cart->get_product_price( $_product ), $cart_item, $cart_item_key );
						$product_permalink = apply_filters( 'woocommerce_cart_item_permalink', $_product->is_visible() ? $_product->get_permalink( $cart_item ) : '', $cart_item, $cart_item_key );
						?>

                        <div class="item">
                            <div class="item__pic">
                                <a href="<?php echo $product_permalink; ?>">
									<?php echo $thumbnail; ?>
                                </a>
                            </div>
                            <div class="item__attributes">
                                <h4>
                                    <a href="<?php echo $product_permalink; ?>">
										<?php echo $product_name; ?>
                                    </a>
                                </h4>
								<?php
								wc_display_product_attributes( $_product );
								?>
                            </div>
                            <div class="item__price">
                                <span class="item__price-current">  <?php echo $product_price; ?> </span>
                                <div class="item__amount">
									<?php echo $cart_item['quantity']; ?>
                                </div>
                            </div>
                            <button class="offcanvas__item-remove">
								<?php
								echo apply_filters( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
									'woocommerce_cart_item_remove_link',
									sprintf(
										'<a href="%s" class="remove remove_from_cart_button" aria-label="%s" data-product_id="%s" data-cart_item_key="%s" data-product_sku="%s">
                                           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 6H21" stroke="#ECF0E6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19 6V20C19 21 18 22 17 22H7C6 22 5 21 5 20V6" stroke="#ECF0E6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 6V4C8 3 9 2 10 2H14C15 2 16 3 16 4V6" stroke="#ECF0E6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                                        </a>',
										esc_url( wc_get_cart_remove_url( $cart_item_key ) ),
										/* translators: %s is the product name */
										esc_attr( sprintf( __( 'Remove %s from cart', 'woocommerce' ), wp_strip_all_tags( $product_name ) ) ),
										esc_attr( $product_id ),
										esc_attr( $cart_item_key ),
										esc_attr( $_product->get_sku() )
									),
									$cart_item_key
								);
								?>

                            </button>
                        </div>
					<?php }
				}
				?>
            </div>
            <div class="woocommerce-mini-cart__buttons buttons offcanvas__footer">
                <a class="btn btn--main offcanvas__checkout" href="<?php echo wc_get_checkout_url(); ?>">Оформить
                    заказ</a>
                <!--                <button class="btn btn--main offcanvas__checkout open-modal-order">Оформить-->
                <!--                    заказ</button>-->
                <button class="open-calc">
                    <img src="/wp-content/themes/entrega/assets/img/calc-icn.svg" alt="">
                </button>
            </div>

		<?php else : ?>

            <div class="woocommerce-mini-cart__empty-message">
                <h3>добавьте в корзину товары</h3>
                <a href="/shop" class="btn btn--second">Открыть каталог</a>
            </div>
            <div class="woocommerce-mini-cart__buttons buttons offcanvas__footer">

            </div>

		<?php endif; ?>
    </div>

<?php do_action( 'woocommerce_after_mini_cart' ); ?>