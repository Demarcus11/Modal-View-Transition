const openButtons = document.querySelectorAll("[data-toggle='modal']");
const closeButtons = document.querySelectorAll("[data-dismiss]");
const modals = document.querySelectorAll(".recipe-modal");

/*
Open the modal when clicking the 'view recipe button'
*/
openButtons.forEach((button) => {
  button.addEventListener("click", async (e) => {
    const modalId = e.currentTarget.dataset.target;
    const modal = document.querySelector(modalId);

    await asyncOpenModal(modal);
  });
});

/*
Close modal if user clicks outside of recipe-modal_inner
*/
modals.forEach((modal) => {
  modal.addEventListener("click", async (e) => {
    if (!e.target.closest(".recipe-modal__inner")) {
      await asyncCloseModal(modal);
    }
  });
});

/*
Apply view transition when the user presses the escape key to close the modal
*/
modals.forEach((modal) => {
  modal.addEventListener("cancel", async (e) => {
    e.preventDefault(); // prevent default modal close transition

    await asyncCloseModal(modal);
  });
});

/*
Close the modal when clicking done button
*/
closeButtons.forEach((button) => {
  button.addEventListener("click", async (e) => {
    // Get the parent modal of the button
    const modal = e.currentTarget.closest(".recipe-modal");

    await asyncCloseModal(modal);
  });
});

async function asyncOpenModal(modal) {
  // fallback if browser doesnt support view transitions
  if (!document.startViewTransition) {
    modal.showModal();
    modal.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    return;
  }

  modal.style.viewTransitionName = "selected-modal";

  const transition = document.startViewTransition(() => {
    modal.showModal();
    modal.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  await transition.finished;
}

async function asyncCloseModal(modal) {
  if (!document.startViewTransition) {
    modal.close();
    return;
  }

  const transition = document.startViewTransition(() => {
    modal.close();
  });
  await transition.finished;
  modal.style.viewTransitionName = "";
}
