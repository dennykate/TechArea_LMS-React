import Swal, { SweetAlertResult } from "sweetalert2";

const alertActions = (callback: () => void, text: string) => {
  Swal.fire({
    title: "Warning !",
    background: "#fffff",
    text,
    icon: "warning",
    iconColor: "#DCA715",
    showCancelButton: true,
    confirmButtonColor: "#166534",
    cancelButtonColor: "#991B1B",
    confirmButtonText: "Confirm",
    cancelButtonText: "Cancel",
  }).then((result: SweetAlertResult) => {
    if (result.isConfirmed) {
      return callback();
    }
  });
};

export default alertActions;
