window.addEventListener('load', function () {
  if (!$('.select-category')[0]) return false; 

    function buildCategoryForm(categories) { 
      let options = "";
      if(categories[0].ancestry.indexOf("/", 0) == -1){
        relation = "child";
        } else {
        relation = "grandchild";
        }
      categories.forEach(function (category) { 
      options += `
                  <option value="${category.id}">${category.name}</option><br>
                 `;
    });

      const html = `
                  <br class=“${relation}“>
                  <select required=“required” class="select-category ${relation}" id="parent-category" name="item[category_id]">
                    <option value="${relation}">選択してください</option>
                    ${options}
                  </select>
                   `;
      return html;
    }

    function existForm(categories) {
      if(categories[0].ancestry.indexOf("/", 0) == -1){
        $('.child').remove();
        $('.grandchild').remove();
      } else {
        $('.grandchild').remove();
      }
    }
    function selectNoValue(categories) {
      if(categories.initial == "parent"){
        $('.child').remove();
        $('.grandchild').remove();
      } else if(categories.initial == "child"){
        $('.grandchild').remove();
      }
    }

    $(".sell-collection_select").on("change", ".select-category", function () { 
      const category_id = $(this).val();

      $.ajax({
        url: "/api/categories", 
        type: "GET",
        data: {
          category_id: category_id
        },
        dataType: 'json',
        }).done(function (categories) {
          if(categories.array.length != 0){
            existForm(categories.array);
            const html = buildCategoryForm(categories.array);
            $(".select-category:last").after(html);
          }
            selectNoValue(categories)
        })
        .fail(function () {
        })
  });
});