/**
 * @description 컴포넌트 만드는 클래스, 컴포넌트 사용 방법을 강제하여 좀 더 규칙있게 컴포넌트를 만들 수 있습니다.
 */
export default class Component {
  $target: HTMLElement;
  $props: any;
  $state: any;
  constructor($target: HTMLElement, $props?: any) {
    this.$target = $target;
    this.$props = $props;
    this.setup();
    this.render();
    this.setEvent();
  }
  setup() {}
  mounted() {}
  template() {
    return '';
  }
  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }
  setEvent() {}
  setState(newState: any) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }
}
