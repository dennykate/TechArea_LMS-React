import Swal, { SweetAlertResult } from "sweetalert2";

const alertActions = (callback: () => void, text: string) => {
  Swal.fire({
    title: "သေချာပြီလား?",
    background: "#212121",
    text,
    icon: "warning",
    iconColor: "#DCA715",
    showCancelButton: true,
    confirmButtonColor: "#166534",
    cancelButtonColor: "#991B1B",
    confirmButtonText: "အတည်ပြုမည်",
    cancelButtonText: "ငြင်းပယ်မည်",
  }).then((result: SweetAlertResult) => {
    if (result.isConfirmed) {
     return callback();
    }
  });
};

export default alertActions;
