document.addEventListener("DOMContentLoaded", () =>{
    const menuItems = document.querySelectorAll(".menu-item");

    menuItems.forEach(item => {
        const btn = item.querySelector(".compare-btn");

        if(!btn) return;

        btn.style.display = "none";

        item.addEventListener("mouseenter", () =>{
            btn.style.display = "inline-block";
        });

        item.addEventListener("mouseleave", () =>{
            btn.style.display = "none";
        });

        btn.addEventListener("click", () =>{
            const name = item.querySelector(".item-name").textContent;
            const description = item.querySelector(".description").textContent;
            const price = item.querySelector(".price").textContent;

            let compareItems = JSON.parse(localStorage.getItem("compareItems")) || [];

            if(!compareItems.some(i=> i.name === name)){
                compareItems.push({name,description, price});
                localStorage.setItem("compareItems", JSON.stringify(compareItems));
            }
        });
    });

    function loadComparePage(){
        const tableBody = document.getElementById("compare-body");
        if(!tableBody) return;

        const compareItems = JSON.parse(localStorage.getItem("compareItems")) || [];

        compareItems.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${item.name}</td><td>${item.description}</td><td>${item.price}</td>`;
            tableBody.appendChild(row);
        });

    }

    const clearBtn = document.getElementById("clear-compare");
    if(clearBtn){
        clearBtn.addEventListener("click", () =>{
            localStorage.removeItem("compareItems");
            loadComparePage();
        });
    }
    loadComparePage();
});
