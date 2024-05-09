</main>
<footer class="footer">
    <div class="container">
        <div class="footer__wrap">
            <div class="footer__block footer__block--catalog">
                <a class="footer__logo footer__logo--mobile" href="">
                    <img src="/wp-content/uploads/2024/05/logo.svg" alt="">
                </a>
                <h4 class="footer__title">Каталог</h4>
                <div class="footer__links">
                    <!--                    получаем ссылки на категории-->
					<?php
					$args       = array( 'taxonomy' => 'product_cat' );
					$categories = get_categories( $args );
					?>
					<?php foreach ( $categories as $category ): ?>
						<?php $category_link = get_category_link( $category->term_id ); ?>
                        <a href="<?= $category_link; ?>"><?= $category->name ?></a>
					<?php endforeach; ?>
                </div>
            </div>
            <div class="footer__block footer__block--btns">
                <div class="footer__btns"><a class="btn btn--second" href="/shop">открыть каталог</a>
                    <button class="btn btn--second open-modal">Обратная связь</button>
                </div>
            </div>
            <div class="footer__block footer__block--list">
                <ul class="footer__list">
                    <li>ООО «Интрега Инжиниринг»</li>
                    <li>ИНН 7806574003</li>
                    <li>ОГРН 1207800086086</li>
                </ul>
            </div>
            <div class="footer__block footer__block--contacts"><a class="footer__logo footer__logo--desctop"
                                                                  href=""><img
                            src="/wp-content/uploads/2024/05/logo.svg" alt=""></a>
                <div class="footer__contacts">
                    <div class="footer__item"><span>Телефон/факс</span><a href="tel:+79660717555"> +7 (966)
                            07-17-555</a></div>
                    <div class="footer__item"><span>Почта</span><a
                                href="mailto:info@entrega-in.com">info@entrega-in.com</a>
                    </div>
                    <div class="footer__item"><span>Адрес склада</span><a href="">МО, г. Химки,<br>Вашутинское шоссе
                            24Б</a></div>
                </div>
            </div>
            <div class="footer__block footer__block--clients">
                <div class="footer__item">
                    <h4 class="footer__title">Клиентам</h4>
                    <div class="footer__links">
						<?php
						wp_nav_menu(
							array(
								'theme_location' => 'footer_menu_clients',
								'container'      => false,
								'menu_class'     => false,
							)
						)
						?>
                    </div>
                    <div class="footer__item">
                        <h4 class="footer__title">О компании</h4>
                        <div class="footer__links">
							<?php
							wp_nav_menu(
								array(
									'theme_location' => 'footer_menu_about',
									'container'      => false,
									'menu_class'     => false,
								)
							)
							?>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer__bottom"><a href="">ООО Интрега Инжиниринг</a><a href="">Соглашение на обработку
                    персональных данных</a><a href="">Политика конфиденциальности</a><a href="">Разработка сайта</a>
            </div>
        </div>
</footer>
</div>
<?php wp_footer(); ?>

<!--обратная связь -->
<?php get_template_part( 'template-parts/content-feedback-modal' ); ?>
<!--быстрый заказ -->
<?php get_template_part( 'template-parts/content-order-modal' ); ?>
<!--расчитать стоимость -->
<?php get_template_part( 'template-parts/content-calc-modal' ); ?>

<!--меню-->
<div class="main-menu">
    <button class="main-menu__close"><img src="/wp-content/uploads/2024/05/close.svg" alt=""></button>
	<?php
	wp_nav_menu(
		array(
			'theme_location' => 'header_menu',
			'container'      => false,
			'menu_class'     => 'main-menu__wrap',
		)
	)
	?>
</div>
<!--корзина-->
<div class="offcanvas">
    <div class="offcanvas__head">
        <h2 class="offcanvas__title">Ваш заказ</h2>
        <button class="offcanvas__close">
            <img src="<?php echo get_template_directory_uri() . '/assets/img/exit.svg'; ?>"
                 alt="">
        </button>
    </div>
    <div class="offcanvas__wrap">
		<?php woocommerce_mini_cart(); ?>
    </div>
</div>
<div class="overlay"></div>
</body>
</html>
