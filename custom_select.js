var Custom_Select = (function()
{

  // Visible Interface
  var visible = {};

  // Private Variables
  var _form_element;
  var _custom_selects;
  var _action;

  //****************************************
  // Initialize
  //****************************************

  visible.Initialize = function(options)
  {
    _form_element = document.querySelector(options.form_element) || false;
    _custom_selects = document.querySelectorAll(options.custom_selects) || false;
    _action = options.action || false;

    Enable_Tabbing_For_Each_Select();
    Watch_For_Select_Focus();
    Watch_For_Select_Click();
    Watch_For_Click_Outside_Select();
  }

  //****************************************
  // Enable tabbing for each select
  //****************************************

  var Enable_Tabbing_For_Each_Select = function()
  {
    _custom_selects.forEach(function(select)
    {
      select.tabIndex = 0;
    });
  }

  //****************************************
  // Watch for select click
  //****************************************

  var Watch_For_Select_Focus = function()
  {
    _custom_selects.forEach(function(select)
    {
      select.addEventListener('focus', function()
      {
        window.addEventListener('keydown', Listen_For_Arrow_Clicks);
      });

      select.addEventListener('blur', function()
      {
        window.removeEventListener('keydown', Listen_For_Arrow_Clicks);
      });
    });
  }

  //****************************************
  // Listen for arrow clicks
  //****************************************

  var Listen_For_Arrow_Clicks = function(e)
  {
    var permitted_keycode = [
      40, // Down arrow key
      38  // Up arrow key
    ];

    if(permitted_keycode.indexOf(e.keyCode) !== -1)
    {
      e.preventDefault();

      var select = event.target;
      var option = false;

      if(e.keyCode === 40)
      {
        option = select.querySelector('.option.selected').nextElementSibling;
      }
      else if(e.keyCode === 38)
      {
        option = select.querySelector('.option.selected').previousElementSibling;
      }

      if(option)
      {
        Update_Select_Selection(option);
      }
    }
  }

  //****************************************
  // Watch for select click
  //****************************************

  var Watch_For_Select_Click = function()
  {
    _custom_selects.forEach(function(select)
    {
      select.addEventListener('click', function()
      {
        this.classList.toggle('open');

        Watch_For_Option_Click(this);
      });
    });
  }

  //****************************************
  // Watch for option click
  //****************************************

  var Watch_For_Option_Click = function(select)
  {
    var options = select.querySelectorAll('.option');

    options.forEach(function(option)
    {
      option.addEventListener('click', function()
      {
        Update_Select_Selection(this);
      });
    });
  }

  //****************************************
  // Update select selection
  //****************************************

  var Update_Select_Selection = function(option)
  {
    if(!option.classList.contains('selected'))
    {
      Add_Selected_Class(option);
      Update_Select_Title(option);
      Update_Select_Hidden_Input(option);
      Select_On_Click_Action(option);
    }
  }

  //****************************************
  // Add selected class
  //****************************************

  var Add_Selected_Class = function(option)
  {
    var parent_element = option.parentElement.parentElement;
    var selected_option = parent_element.querySelector('.option.selected');

    if(selected_option)
    {
      selected_option.classList.remove('selected');
    }

    option.classList.add('selected');
  }

  //****************************************
  // Update title
  //****************************************

  var Update_Select_Title = function(option)
  {
    var parent_element = option.parentElement.parentElement;
    var title = parent_element.querySelector('.title span');

    title.innerHTML = option.textContent;
  }

  //****************************************
  // Update select hidden input
  //****************************************

  var Update_Select_Hidden_Input = function(option)
  {
    var parent_element = option.parentElement.parentElement;
    var parent_name = parent_element.dataset.name;
    var option_text = option.dataset.value;

    var select_hidden_input = document.querySelector('[name="' + parent_name + '"]') || false;

    if(select_hidden_input)
    {
      select_hidden_input.value = option_text;
    }
    else
    {
      var hidden_input = document.createElement('input');
      hidden_input.type = 'hidden';
      hidden_input.id = parent_name;
      hidden_input.name = parent_name;
      hidden_input.value = option_text;

      _form_element.appendChild(hidden_input);

      Watch_Form_Hidden_Input_Change(hidden_input);
    }
  }

  //****************************************
  // Watch for hidden input change
  //****************************************

  var Watch_Form_Hidden_Input_Change = function(select_hidden_input)
  {
    select_hidden_input.addEventListener('change', function()
    {
      var input_value = this.value;
      var input_name = this.name;

      var title = document.querySelector('[data-name="' + input_name + '"] .title span');
      var options = document.querySelectorAll('[data-name="' + input_name + '"] .option');

      options.forEach(function(option)
      {
        if(option.dataset.value === input_value)
        {
          // Update selected class
          option.classList.add('selected');

          // Update select title
          title.innerHTML = option.textContent;
        }
        else
        {
          option.classList.remove('selected');
        }
      });
    });
  }

  //****************************************
  // Select on click action
  //****************************************

  var Select_On_Click_Action = function()
  {
    if(_action)
    {
      _action();
    }
  }

  //****************************************
  // Watch for click outside select
  //****************************************

  var Watch_For_Click_Outside_Select = function()
  {
    window.addEventListener('click', function(e)
    {
      _custom_selects.forEach(function(select)
      {
        if(!select.contains(e.target))
        {
          select.classList.remove('open');
        }
      });
    });
  }

  // Return public interface
  return visible;

})
