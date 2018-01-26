var menu = require('./_menu')

module.exports = {
  controller: PageOne,
  template: `
    <main>
      ${menu()}

      <h1>angul-test</h1>

      <p>
        <span>{{$ctrl.clicks}}</span>
        <span>number of clicks</span>
      </p>

      <button ng-click="$ctrl.handleClick()">click</button>

    </main>`
}

function PageOne () {
  this.clicks = 0

  this.$onInit = function () {

  }

  this.handleClick = function () {
    this.clicks++
  }
}
