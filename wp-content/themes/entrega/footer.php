</main>
<footer class="footer">
    <div class="container">
        <div class="footer__wrap">
            <div class="footer__block footer__block--catalog"><a class="footer__logo footer__logo--mobile"
                                                                 href=""><img src="/wp-content/uploads/2024/05/logo.svg"
                                                                              alt=""></a><h4
                        class="footer__title">Каталог</h4>
                <div class="footer__links"><a href="">Преобразователи частоты</a><a href="">Устройства плавного
                        пуска</a><a href="">Запасные части</a></div>
            </div>
            <div class="footer__block footer__block--btns">
                <div class="footer__btns"><a class="btn btn--second" href="">открыть каталог</a>
                    <button class="btn btn--second" href="">Обратная связь</button>
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
                <div class="footer__item"><h4 class="footer__title">Клиентам</h4>
                    <div class="footer__links"><a href="">Доставка и оплата</a><a href="">Гарантия</a><a href="">Самовывоз</a><a
                                href="">Документация</a></div>
                </div>
                <div class="footer__item"><h4 class="footer__title">О компании</h4>
                    <div class="footer__links"><a href="">О компании</a><a href="">Реквизиты</a><a
                                href="">Новости</a><a href="">Контакты</a></div>
                </div>
            </div>
        </div>
        <div class="footer__bottom"><a href="">ООО Интрега Инжиниринг</a><a href="">Соглашение на обработку
                персональных данных</a><a href="">Политика конфиденциальности</a><a href="">Разработка сайта</a></div>
    </div>
</footer>
<div class="vectors">
</div>
</div>
<?php wp_footer(); ?>
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
<div class="overlay"></div>
</body>
</html>
