<?php get_header(); ?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

<?php wp_body_open(); ?>
<div class="wrapper">
    <header class="header">
        <div class="header__wrap">
            <div class="header__top">
                <div class="container"><span>Поставки приводной техники</span>
                    <div class="header__nav"><a href="delivery.html">Доставка и оплата</a><a href="about.html">О
                            компании</a><a href="contacts.html">Контакты</a></div>
                    <div class="header__contacts"><a class="header__contacts-tel" href="tel:+79660717555">+7 (966)
                            07-17-555</a><a class="header__contacts-mail" href="mailto:info@entrega-in.com">info@entrega-in.com</a>
                    </div>
                </div>
            </div>
            <div class="header__bottom">
                <div class="container">
                    <a class="header__logo" href="<?php echo home_url( '/' ) ?>">
                        <img src="/wp-content/uploads/2024/05/logo.svg" alt="">
                    </a>
                    <div class="header__category">
                        <!--                                            получаем ссылки на категории-->
						<?php
						$args       = array( 'taxonomy' => 'product_cat' );
						$categories = get_categories( $args );
						?>
						<?php foreach ( $categories as $category ): ?>
							<?php $category_link = get_category_link( $category->term_id ); ?>
                            <a href="<?= $category_link; ?>">
								<?= $category->name ?></a>
						<?php endforeach; ?>
                        <!--                        <div class="header__category">-->
                        <!--                            <div class="header__category-select">-->
                        <!--                                <button class="category__1">Преобразователи частоты</button>-->
                        <!--	                            --><?php
						//	                            $tax     = 'pa_brend';
						//	                            $pa_args = get_terms( $tax, array(
						//			                            'hide_empty' => false,
						//		                            )
						//	                            );
						//	                            foreach ( $pa_args as $pa_arg ) {
						//		                            echo $pa_arg->name;
						//	                            }
						//	                            ?>
                        <!--                            </div>-->
                        <!--                            <div class="header__category-select">-->
                        <!--                                <button class="category__2">Устройства плавного пуска</button>-->
                        <!--	                            --><?php
						//	                            $tax     = 'pa_brend';
						//	                            $pa_args = get_terms( $tax, array(
						//			                            'hide_empty' => false,
						//		                            )
						//	                            );
						//                                echo '<pre>';
						//                                var_dump($pa_args);
						//                                echo '</pre>';
						//	                            foreach ( $pa_args as $pa_arg ) {
						//		                            echo $pa_arg->name;
						//	                            }
						//	                            ?>
                        <!--                            </div>-->
                        <!--                            <div class="header__category-select">-->
                        <!--                                <button class="category__3">Запасные части</button>-->
                        <!--	                            --><?php
						//	                            $tax     = 'pa_brend';
						//	                            $pa_args = get_terms( $tax, array(
						//			                            'hide_empty' => false,
						//		                            )
						//	                            );
						//	                            foreach ( $pa_args as $pa_arg ) {
						//		                            echo $pa_arg->name;
						//	                            }
						//	                            ?>
                        <!--                            </div>-->
                        <!---->
                        <!---->
                        <!--                        </div>-->

                    </div>
                    <div class="header__btns">
                        <button class="header__search">
							<?php aws_get_search_form( true ); ?>
                        </button>
                        <button class="header__basket">
                            <!--                            <img src="/wp-content/uploads/2024/05/basket.svg" alt="">-->
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 22C8.55228 22 9 21.5523 9 21C9 20.4477 8.55228 20 8 20C7.44772 20 7 20.4477 7 21C7 21.5523 7.44772 22 8 22Z"
                                      fill="url(#paint0_linear_488_2314)" stroke="url(#paint1_linear_488_2314)"
                                      stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M19 22C19.5523 22 20 21.5523 20 21C20 20.4477 19.5523 20 19 20C18.4477 20 18 20.4477 18 21C18 21.5523 18.4477 22 19 22Z"
                                      fill="url(#paint2_linear_488_2314)" stroke="url(#paint3_linear_488_2314)"
                                      stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M2.04999 2.05H4.04999L6.70999 14.47C6.80757 14.9249 7.06066 15.3315 7.4257 15.6199C7.79074 15.9082 8.24489 16.0604 8.70999 16.05H18.49C18.9452 16.0493 19.3865 15.8933 19.741 15.6078C20.0956 15.3224 20.3421 14.9245 20.44 14.48L22.09 7.05H5.11999"
                                      stroke="url(#paint4_linear_488_2314)" stroke-linecap="round"
                                      stroke-linejoin="round"/>
                                <defs>
                                    <linearGradient id="paint0_linear_488_2314" x1="9" y1="21" x2="7" y2="21"
                                                    gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#B2FF2E"/>
                                        <stop offset="0.524453" stop-color="#97E80C"/>
                                        <stop offset="1" stop-color="#B2FF2E"/>
                                    </linearGradient>
                                    <linearGradient id="paint1_linear_488_2314" x1="9" y1="21" x2="7" y2="21"
                                                    gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#B2FF2E"/>
                                        <stop offset="0.524453" stop-color="#97E80C"/>
                                        <stop offset="1" stop-color="#B2FF2E"/>
                                    </linearGradient>
                                    <linearGradient id="paint2_linear_488_2314" x1="20" y1="21" x2="18" y2="21"
                                                    gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#B2FF2E"/>
                                        <stop offset="0.524453" stop-color="#97E80C"/>
                                        <stop offset="1" stop-color="#B2FF2E"/>
                                    </linearGradient>
                                    <linearGradient id="paint3_linear_488_2314" x1="20" y1="21" x2="18" y2="21"
                                                    gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#B2FF2E"/>
                                        <stop offset="0.524453" stop-color="#97E80C"/>
                                        <stop offset="1" stop-color="#B2FF2E"/>
                                    </linearGradient>
                                    <linearGradient id="paint4_linear_488_2314" x1="22.09" y1="9.05025" x2="2.04999"
                                                    y2="9.05025" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#B2FF2E"/>
                                        <stop offset="0.524453" stop-color="#97E80C"/>
                                        <stop offset="1" stop-color="#B2FF2E"/>
                                    </linearGradient>
                                </defs>
                            </svg>


                            <span class="cart-badge"><?php echo WC()->cart->get_cart_contents_count(); ?></span>
                        </button>
                        <button class="burger">
                            <img src="/wp-content/uploads/2024/05/burger-icn.svg" alt="">
                            <span>Меню</span>
                        </button>

                    </div>
                </div>
            </div>
        </div>


    </header>
    <main class="main">