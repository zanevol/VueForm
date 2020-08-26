<template>
  <div id="app">
    <form class="form" @submit.prevent="submitForm">
      <div class="person-form">
        <div class="adress-form__input">
          <label for="user-name" class="form-label">Имя*</label>
          <input type="text" class="form-input" id="user-name" v-model.trim="name" />
          <small
            :class="{invalid: ($v.name.$dirty && !$v.name.required)}"
          >Поле обязательно для заполнения</small>
          <small
            :class="{invalid: ($v.name.$dirty && !$v.name.alpha)}"
          >В поле не должны содержаться цифры и буквы латинского алфавита</small>
        </div>
        <div class="adress-form__input">
          <label for="user-lastname" class="form-label">Фамилия*</label>
          <input type="text" class="form-input" id="user-lastname" v-model.trim="lastname" />
          <small
            :class="{invalid: ($v.lastname.$dirty && !$v.lastname.required)}"
          >Поле обязательно для заполнения</small>
          <small
            :class="{invalid: ($v.lastname.$dirty && !$v.lastname.alpha)}"
          >В поле не должны содержаться цифры и буквы латинского алфавита</small>
        </div>
        <div class="adress-form__input">
          <label for="user-patronymic" class="form-label">Отчество</label>
          <input type="text" class="form-input" id="user-patronymic" />
        </div>
        <div class="adress-form__input">
          <label for="user-birthday" class="form-label">Дата рождения*</label>
          <input type="date" class="form-input" id="user-birthday" v-model="birthday" />
          <small
            :class="{invalid: ($v.birthday.$dirty && !$v.birthday.required)}"
          >Поле обязательно для заполнения</small>
        </div>
        <div class="adress-form__input">
          <label for="user-phone" class="form-label">Телефон*</label>
          <input
            type="tel"
            class="form-input"
            id="user-phone"
            v-model="phone"
            v-phone
            pattern="[(][0-9]{3}[)] [0-9]{3}-[0-9]{2}-[0-9]{2}"
          />
          <small
            :class="{invalid: ($v.phone.$dirty && !$v.phone.required)}"
          >Поле обязательно для заполнения</small>
        </div>
      </div>

      <div class="selects">
        <div class="select" @click="optionsVisible = !optionsVisible">
          <div class="select__header">
            <span class="select__current">{{selected}}</span>
            <div class="select__icon">
              <img src="../src/img/down-arrow.svg" alt="arrow-down" />
            </div>
          </div>

          <div class="select__body" v-if="optionsVisible">
            <div
              class="select__item"
              @click="selectOption(option)"
              v-for="option in bodyOptions"
              :key="option.value"
            >{{option.name}}</div>
          </div>
        </div>

        <div class="select checkhead" @click="optsVisible = true" @mouseleave="optsVisible = false">
          <div class="select__header">
            <span class="select__current check__current">Группа клиентов*</span>
            <div class="select__icon">
              <img src="../src/img/down-arrow.svg" alt="arrow-down" />
            </div>
          </div>

          <div class="check__body" v-if="optsVisible">
            <label class="check">
              <input class="check__input" id="VIP" value="VIP" type="checkbox" v-model="client" />
              <span class="check__box"></span>
              VIP
            </label>
            <label class="check">
              <input
                class="check__input"
                id="Проблемные"
                value="Проблемные"
                type="checkbox"
                v-model="client"
              />
              <span class="check__box"></span>
              Проблемные
            </label>
            <label class="check">
              <input class="check__input" id="ОМС" value="ОМС" type="checkbox" v-model="client" />
              <span class="check__box"></span>
              ОМС
            </label>
          </div>
          <small
            :class="{selinvalid: ($v.client.$dirty && !$v.client.required)}"
          >Поле обязательно для заполнения</small>
        </div>

        <div class="select doctor" @click="optsVis = !optsVis">
          <div class="select__header">
            <span class="doctor__current">{{seld}}</span>
            <div class="select__icon">
              <img src="../src/img/down-arrow.svg" alt="arrow-down" />
            </div>
          </div>

          <div class="doctor__body" v-if="optsVis">
            <div
              class="doctor__item"
              @click="selectOpt(opt)"
              v-for="opt in docOptions"
              :key="opt.value"
            >{{opt.name}}</div>
          </div>
        </div>
      </div>
      <div class="sms-block">
        <label class="sms-check">
          <input class="check__input" type="checkbox" />
          <span class="check__box"></span>
          Не отправлять СМС
        </label>
      </div>

      <h3 class="form__title">Адрес</h3>
      <div class="adress-form">
        <div class="adress-form__input">
          <label for="user-index" class="label">Индекс</label>
          <input type="text" class="form-input adress-input" id="user-index" />
        </div>
        <div class="adress-form__input">
          <label for="user-country" class="label">Страна</label>
          <input type="text" class="form-input adress-input" id="user-country" />
        </div>
        <div class="adress-form__input">
          <label for="user-region" class="label">Область</label>
          <input type="text" class="form-input adress-input" id="user-region" />
        </div>
        <div class="adress-form__input">
          <label for="user-city" class="label">Город*</label>
          <input type="text" class="form-input adress-input" id="user-city" v-model.trim="city" />
          <small
            :class="{invalid: ($v.city.$dirty && !$v.city.required)}"
          >Поле обязательно для заполнения</small>
          <small
            :class="{invalid: ($v.city.$dirty && !$v.city.alpha)}"
          >В поле не должны содержаться цифры и буквы латинского алфавита</small>
        </div>
        <div class="adress-form__input">
          <label for="user-street" class="label">Улица</label>
          <input type="text" class="form-input adress-input" id="user-street" />
        </div>
        <div class="adress-form__input">
          <label for="user-house-num" class="label">Дом</label>
          <input type="text" class="form-input adress-input" id="user-house-num" />
        </div>
      </div>

      <h3 class="form__title">Документы</h3>

      <div class="select docs" @click="optVis = true" @mouseleave="optVis = false">
        <div class="select__header">
          <span class="docs__current" v-bind:value="docsel" v-bind:id="docsel">{{docsel}}</span>
          <div class="select__icon">
            <img src="../src/img/down-arrow.svg" alt="arrow-down" />
          </div>
        </div>

        <div class="docs__body" v-if="optVis">
          <label class="check">
            <input class="check__input" id="Паспорт" value="Паспорт" type="checkbox" v-model="docs" />
            <span class="check__box"></span>
            Паспорт
          </label>
          <label class="check">
            <input
              class="check__input"
              id="Св-во о рождении"
              value="Св-во о рождении"
              type="checkbox"
              v-model="docs"
            />
            <span class="check__box"></span>
            Св-во о рождении
          </label>
          <label class="check">
            <input
              class="check__input"
              id="Вод. удостоверение"
              value="Вод. удостоверение"
              type="checkbox"
              v-model="docs"
            />
            <span class="check__box"></span>
            Вод. удостоверение
          </label>
        </div>
        <small
          :class="{selinvalid: ($v.docs.$dirty && !$v.docs.required)}"
        >Поле обязательно для заполнения</small>
      </div>
      <div class="adress-form">
        <div class="adress-form__input">
          <label for="user-series" class="label">Серия</label>
          <input type="text" class="form-input adress-input" id="user-series" />
        </div>
        <div class="adress-form__input">
          <label for="user-number" class="label">Номер</label>
          <input type="text" class="form-input adress-input" id="user-number" />
        </div>
        <div class="adress-form__input">
          <label for="user-region" class="label">Кем выдан</label>
          <input type="text" class="form-input adress-input" id="user-region" />
        </div>
        <div class="adress-form__input">
          <label for="user-issueday" class="label">Дата выдачи*</label>
          <input type="date" class="form-input adress-input" id="user-issueday" v-model="issueday" />
          <small
            :class="{invalid: ($v.issueday.$dirty && !$v.issueday.required)}"
          >Поле обязательно для заполнения</small>
        </div>
      </div>

      <button type="submit" class="form-btn">Отправить</button>
    </form>
    <div class="form-modal" v-if="modalVis">
      <div class="form-modal__content">
        <h2 class="form-modal__title">Спасибо!</h2>
        <p class="form-modal__text">Новый клиент успешно создан!</p>
        <button class="form-modal__btn" @click="modalVis = false">Ok</button>
      </div>
    </div>
  </div>
</template>

<script>
import { required, helpers } from "vuelidate/lib/validators";

const alpha = helpers.regex("alpha", /^[а-яёА-ЯЁ]*$/);

export default {
  validations: {
    name: { required, alpha },
    lastname: { required, alpha },
    birthday: { required },
    phone: { required },
    client: { required },
    city: { required, alpha },
    docs: { required },
    issueday: { required },
  },
  props: {
    options: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      name: "",
      lastname: "",
      birthday: "",
      phone: "",
      client: [],
      city: "",
      docs: [],
      issueday: "",
      bodyOptions: [
        { name: "Мужской", value: "Мужской" },
        { name: "Женский", value: "Женский" },
      ],
      selected: "Пол",
      optionsVisible: false,
      optsVisible: false,
      optsVis: false,
      optVis: false,
      modalVis: false,
      form: true,
      docOptions: [
        { name: "Иванов", value: "Иванов" },
        { name: "Захаров", value: "Захаров" },
        { name: "Чернышева", value: "Чернышева" },
      ],
      seld: "Лечащий врач",

      docsOpt: [
        { id: "Паспорт", value: "Паспорт" },
        { id: "Св-во о рождении", value: "Св-во о рождении" },
        { id: "Вод.удостоверение", value: "Вод.удостоверение" },
      ],
      docsel: "Тип документа*",
    };
  },
  methods: {
    selectOption(option) {
      this.selected = option.value;
    },
    selectOpt(opt) {
      this.seld = opt.value;
    },
    selOpts(option) {
      this.docsel = option.value;
    },
    submitForm() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      this.modalVis = true;
      this.name = "";
      this.lastname = "";
      this.birthday = "";
      this.phone = "";
      this.client = "";
      this.docs = "";
      this.issueday = "";
      this.city = "";
      this.$v.$reset();
    },
  },
};
</script>

<style lang="sass">
*
	box-sizing: border-box
body
	margin: 0
	padding: 0
	display: flex
	align-items: center
	justify-content: center
	height: 100%
.select
	position: relative
	width: 180px
	margin: 30px 0
	background-color: #fff
	border-radius: 6px
	&__header
		display: flex
		border: 1px solid #ccc
		cursor: pointer
	&__current
		font-size: 16px
		line-height: 24px
		padding: 7px
	&__icon
		display: flex
		flex-shrink: 0
		align-items: center
		justify-content: center
		text-align: center
		width: 40px
		height: 40px
		margin-left: auto
		transition: all .2s ease
	&__body
		border: 1px solid #ccc
		border-top: 0
		position: absolute
		top: 100%
		right: 0
		left: 0
		transition: all 2s ease
		background-color: #fff
		z-index: 99
	&__item
		line-height: 20px
		padding: 6px
		font-size: 16px
		cursor: pointer
		&:hover
			background-color: #f2f2f2
	&:hover &__icon
		transform: rotate(180deg)
	&:not(:last-child)
		margin-right: 10px
.doctor
	&__current
		font-size: 16px
		line-height: 24px
		padding: 8px
	&__body
		border: 1px solid #ccc
		border-top: 0
		position: absolute
		top: 100%
		right: 0
		left: 0
		background-color: #fff
	&__item
		line-height: 20px
		padding: 6px
		font-size: 16px
		cursor: pointer
		&:hover
			background-color: #f2f2f2
.check
	display: flex
	align-items: center
	justify-content: space-between
	line-height: 20px
	padding: 8px
	padding-left: 30px
	font-size: 16px
	cursor: pointer
	&:hover
		background-color: #f2f2f2
	&__body
		border: 1px solid #ccc
		border-top: 0
		position: absolute
		top: 100%
		right: 0
		left: 0
		background-color: #fff
		z-index: 99
	&__input
		position: absolute
		width: 1px
		height: 1px
		overflow: hidden
		clip: rect(0 0 0 0)
		&:checked+.check__box
			background: url('../src/img/tick.svg')
			background-color: #fff
	&__box
		position: absolute
		width: 15px
		height: 15px
		margin-left: -22px
		border: 1px solid #000
		border-radius: 2px
		background-color: #fff
.sms
	&-block
		max-width: 250px
		align-self: start
	&-check
		display: flex
		align-items: center
		justify-content: space-between
		line-height: 20px
		padding-left: 30px
		font-size: 16px
		cursor: pointer
.form
	max-width: 678px
	width: 90%
	display: flex
	flex-direction: column
	align-items: center
	margin: auto
	background-color: #ccc
	padding: 25px
	border-radius: 10px
	&-btn
		background-color: #fff
		border: none
		padding: 12px 45px
		color: #000
		font-size: 16px
		border-radius: 6px
		transition: .2s ease-in-out
		outline: none
		&:hover
			cursor: pointer
			background-color: #f2f2f2

	&-label
		align-self: start
		padding: 5px 0
		font-size: 16px
	&-input
		background-color: transparent
		border: none
		border-bottom: 1px solid rgb(126, 124, 124)
		width: 100%
		&:not(:last-child)
			margin-bottom: 35px
	&__title
		margin: 0
		font-family: 'Roboto', sans-serif
		align-self: start
		margin: 25px 0
.person-form
	display: flex
	justify-content: space-between
	flex-wrap: wrap
.adress
	&-form
		display: flex
		justify-content: space-between
		flex-wrap: wrap
		&__input
			position: relative
			width: 45%
			margin-bottom: 30px
	&-input
		align-self: start
.docs
	width: 185px
	position: relative
	margin: 0
	margin-bottom: 35px
	align-self: start
	&__current
		font-size: 16px
		line-height: 24px
		padding: 8px
	&__item
		line-height: 20px
		padding: 6px
		font-size: 16px
		cursor: pointer
		&:hover
			background-color: #f2f2f2
	&__body
		position: absolute
		border: 1px solid #ccc
		border-top: 0
		top: 100%
		right: 0
		left: 0
		background-color: #fff
		z-index: 99
.selects
	display: flex
	flex-wrap: wrap
.label
	align-self: start
small
	display: none
.invalid
	display: block
	position: absolute
	color: red
	left: 0
	top: 60%
.selinvalid
	display: block
	position: absolute
	color: red
	left: 2%
	top: 110%
#user-phone
	padding-left: 15px
	background: url('../src/img/seven.svg') no-repeat center left
.form-modal
	opacity: 1
	display: flex
	align-items: center
	justify-content: center
	position: fixed
	z-index: 199
	left: 0
	top: 0
	bottom: 0
	right: 0
	width: 100%
	height: 100%
	background-color: rgba(0,0,0, .6)
	transition: .5s all
	&__content
		position: relative
		max-width: 39.36rem
		width: 90%
		background-color: #ccc
		padding: 2.3rem 3.5rem 2rem
		border-radius: 10px
	&__title
		color: #000
		text-align: center
		font-weight: normal
		font-size: 1.357rem
		line-height: 1.857rem
		margin: 0
		margin: 0 auto 2rem
	&__text
		text-align: center
		font-weight: normal
		font-size: 1.1rem
		line-height: 1.857rem
		margin: 0
		margin: 0 auto 2.5rem
		color: #000
	&__btn
		display: flex
		justify-content: center
		margin: 0 auto
		background-color: #fff
		border: none
		padding: 12px 45px
		color: #000
		font-size: 16px
		border-radius: 6px
		transition: .2s ease-in-out
		outline: none
		&:hover
			cursor: pointer
			background-color: #f2f2f2

@media (max-width: 500px)
	.person-form
		flex-direction: column
		align-items: center
		width: 100%
	.adress-form__input
		width: 100%
</style>
