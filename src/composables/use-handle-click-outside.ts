import { watch, type Ref } from "vue";

/**
 * Close element when clicked outside it.
 *
 * @param element ref of target element.
 * @param state of target element.
 * @param callback (optional) function to execute on each state change.
 */

export function useHandleClickOutside(
  element: Ref<HTMLElement | null>,
  state: Ref<boolean>,
  callback?: VoidFunction
) {
  function closeElement(event: MouseEvent) {
    if (
      !(
        event.target === element.value ||
        element.value?.contains(event.target as HTMLElement)
      )
    ) {
      state.value = false;
    }
  }

  watch(state, () => {
    if (state.value) {
      document.addEventListener("click", closeElement);
    } else {
      document.removeEventListener("click", closeElement);
    }

    callback && callback();
  });
}
