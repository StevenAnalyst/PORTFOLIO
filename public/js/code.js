document.getElementById("copiarEmail").addEventListener("click", function (event) {
      event.preventDefault();

      const email = "s.stevenanalyst@gmail.com";

      navigator.clipboard.writeText(email).then(() => {
        let toast = document.getElementById("toast");
        toast.classList.add("show");

        setTimeout(() => {
          toast.classList.remove("show");
        }, 2000);
      });
    });