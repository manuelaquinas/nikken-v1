

//acciones internas de los niveles
//nivel 1


var downloadBtn1 = document.getElementById("download-l1");
downloadBtn1.addEventListener("click", function () {
    alert("Descargar en Google Drive");
    window.open("https://drive.google.com/drive/u/0/folders/1nVhc_GuDaavQQgSMHC2J5TeCn8l-JJhZ", "_blank");

    var nextStepBtn = document.createElement("button");
    nextStepBtn.innerHTML = "Next step";
    nextStepBtn.classList.add("rn-btn", "w-auto", "btn-center", "mt-5");
    nextStepBtn.setAttribute("id", "next-level-modal");

    nextStepBtn.addEventListener("click", function () {
        $("#ModalCenter-1").modal("hide");
    });

    downloadBtn1.parentNode.insertBefore(nextStepBtn, downloadBtn1.nextSibling);
});




//nivel 2

var downloadBtn2 = document.getElementById("download-l2");
downloadBtn2.addEventListener("click", function () {
    alert("Descargar en Google Drive");
    window.open("https://drive.google.com/drive/u/0/folders/1nVhc_GuDaavQQgSMHC2J5TeCn8l-JJhZ", "_blank");

    var nextStepBtn = document.createElement("button");
    nextStepBtn.innerHTML = "Next step";
    nextStepBtn.classList.add("rn-btn", "w-auto", "btn-center", "mt-5");
    nextStepBtn.setAttribute("id", "next-level-modal");

    nextStepBtn.addEventListener("click", function () {
        $("#ModalCenter-2").modal("hide");
    });

    downloadBtn2.parentNode.insertBefore(nextStepBtn, downloadBtn2.nextSibling);
});

//nivel 3

var downloadBtn3 = document.getElementById("download-l3");
downloadBtn3.addEventListener("click", function () {
    alert("Descargar en Google Drive");
    window.open("https://drive.google.com/drive/u/0/folders/1LX_SfIm5dwIAhXqZUNSioLJRH8KurGpx", "_blank");

    var nextStepBtn = document.createElement("button");
    nextStepBtn.innerHTML = "Next step";
    nextStepBtn.classList.add("rn-btn", "w-auto", "btn-center", "mt-5");
    nextStepBtn.setAttribute("id", "next-level-modal");

    nextStepBtn.addEventListener("click", function () {
        $("#ModalCenter-3").modal("hide");
    });

    downloadBtn3.parentNode.insertBefore(nextStepBtn, downloadBtn3.nextSibling);
});

//nivel 4

var downloadBtn4 = document.getElementById("download-l4");
downloadBtn4.addEventListener("click", function () {
    alert("Descargar en Google Drive");
    window.open("https://drive.google.com/file/d/1ZBDjdRV1zdSljpp9rF4ZO9BHaWvKUjpy/view?usp=sharing.", "_blank");

    var nextStepBtn = document.createElement("button");
    nextStepBtn.innerHTML = "Next step";
    nextStepBtn.classList.add("rn-btn", "w-auto", "btn-center", "mt-5");
    nextStepBtn.setAttribute("id", "next-level-modal");

    nextStepBtn.addEventListener("click", function () {
        $("#ModalCenter-4").modal("hide");
    });

    downloadBtn4.parentNode.insertBefore(nextStepBtn, downloadBtn4.nextSibling);
});

//nivel 5

var downloadBtn5 = document.getElementById("download-l5");
downloadBtn5.addEventListener("click", function () {
    alert("Descargar en Google Drive");
    window.open("https://drive.google.com/drive/u/0/folders/1nVhc_GuDaavQQgSMHC2J5TeCn8l-JJhZ", "_blank");

    var nextStepBtn = document.createElement("button");
    nextStepBtn.innerHTML = "Next step";
    nextStepBtn.classList.add("rn-btn", "w-auto", "btn-center", "mt-5");
    nextStepBtn.setAttribute("id", "next-level-modal");

    nextStepBtn.addEventListener("click", function () {
        $("#ModalCenter-5").modal("hide");
    });

    downloadBtn5.parentNode.insertBefore(nextStepBtn, downloadBtn5.nextSibling);
});

//nivel 6

var downloadBtn6 = document.getElementById("download-l6");
downloadBtn.addEventListener("click", function () {
    alert("Descargar en Google Drive");
    window.open("https://drive.google.com/drive/u/0/folders/1nVhc_GuDaavQQgSMHC2J5TeCn8l-JJhZ", "_blank");

    var nextStepBtn = document.createElement("button");
    nextStepBtn.innerHTML = "Next step";
    nextStepBtn.classList.add("rn-btn", "w-auto", "btn-center", "mt-5");
    nextStepBtn.setAttribute("id", "next-level-modal");

    nextStepBtn.addEventListener("click", function () {
        $("#ModalCenter-6").modal("hide");
    });

    downloadBtn6.parentNode.insertBefore(nextStepBtn, downloadBtn6.nextSibling);
});






