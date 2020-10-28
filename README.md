# Custom-Select-Element

## Getting Started
Download and add the css and javscript files to your project.

**Insert the following select structure in your project**
```html
<div class="custom-select" data-name="xRANGE">
  <div class="title"><span>Select an Option</span></div>
  <div class="options">
    <span class="option selected" data-value="1">Option 1</span>
    <span class="option" data-value="2">Option 2</span>
    <span class="option" data-value="3">Option 3</span>
    <span class="option" data-value="4">Option 4</span>
    <span class="option" data-value="5">Option 5</span>
    <span class="option" data-value="6">Option 6</span>
    <span class="option" data-value="7">Option 7</span>
    <span class="option" data-value="8">Option 8</span>
    <span class="option" data-value="9">Option 9</span>
  </div>
</div>
```

**Add the following javsacript to the footer of the page**
```js
var custom_select = new Custom_Select();
custom_select.Initialize({
  form_element: '.form-name',
  custom_selects: '.custom-select',
  action: someFunction
});
```
