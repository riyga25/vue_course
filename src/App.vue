<template>
  <div id="app">
        <header class="header">
        <div class="wrapper header__container">
            <a href="/" class="header__left">
                Прогуляй стипендию!
            </a>
            <div class="header__center">
                Размер стипендии <span class="h-money">2000</span> ₽
            </div>
            <div class="header__right">
                Добавить место
            </div>
        </div>
    </header>
    <main>
        <div class="preheader">
            <div class="wrapper">
                <a href="#" class="preheader__desk preheader__desk_back">Вернуться к списку</a>
                <h2 class="perheader__title">Добавление места</h2>
            </div>
        </div>
        <div class="main-info">
            <div class="wrapper flex-container">
                <div class="inputs">
                    <div class="inputs__list">
                        <div class="inputs__item">
                            <label for="place-name">Название</label>
                            <input type="text" id="place-name" placeholder="Введите название места">
                        </div>
                        <div class="inputs__item">
                            <label for="place-address">Адрес:</label>
                            <input type="text" id="place-address" placeholder="Введите точный адрес места">
                        </div>
                        <div class="inputs__item">
                            <label for="place-average">Средний чек:</label>
                            <input type="text" id="place-average" placeholder="Введите размер среднего чека, руб.">
                        </div>
                        <div class="inputs__item">
                            <label for="place-category">Категория:</label>
                            <select id="place-category">
                                <option value="">Бар</option>
                            </select>
                        </div>
                        <div class="inputs__item upload-file">
                            <label class="upload-file__label" for="place-photo">
                                Фото:
                                <span class="upload-file__place"></span>
                                <input class="upload-file__input" type="file" id="place-photo" accept="image/jpeg,image/jpg,image/png">
                            </label>
                            <div class="upload-file__preview">
                                <img src="img/uploadphoto.jfif" alt="image">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="big-map">
                    <div class="big-map__label">Укажите место на карте:</div>
                    <div class="big-map__img" style="background-image: url('./assets/img/bigmap.png');background-position: center"></div>
                </div>
            </div>
        </div>
    </main>
    <footer class="footer">
        <div class="wrapper">
            <p class="footer__copyright">SimborSoft</p>
        </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {}
}
</script>

<style lang="scss">

</style>
