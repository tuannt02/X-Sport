const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

function Validator(options)    {

    function getParent(element, selector)    {
        while(element.parentElement)    {
            if(element.parentElement.matches(selector)) {
                return element.parentElement;
            }

            element = element.parentElement;
        }
    }

    var selectorRules = {};


    function validate(inputElement, rule, formElement = true) {
        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
        var errorMessage;
                    
        var rules = selectorRules[rule.selector];
        for(var i=0;i<rules.length;i++) {
            switch  (inputElement.type)  {
                case 'checkbox':
                case 'radio':
                    errorMessage= rules[i]($('input[name="gender"]:checked'));
                    break;
                default:
                    errorMessage = rules[i](inputElement.value);
            }

            if(errorMessage) break;
        }

        if(errorMessage) {
            errorElement.innerText = errorMessage;
            getParent(inputElement, options.formGroupSelector).classList.add('invalid');
            formElement.isValid = false;
        }
        else    {
            errorElement.innerText = '';  
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid');

        }
    }

    var formElement = $(options.form);


    if(formElement) {
        formElement.onsubmit = function(e)   {
            e.preventDefault();
            formElement.isValid = true;

            // validate submit btn
            options.rules.forEach(function(rule)    {
                var inputElement = formElement.querySelector(rule.selector);
                validate(inputElement, rule, formElement);
            
            })


            if(formElement.isValid) {
                // Submit with JS
                if(typeof options.onSubmit === 'function')  {
                    var enableInputs = formElement.querySelectorAll('[name]');
                    var formValues = Array.from(enableInputs).reduce(function(values, input)    {
                        switch(input.type)  {
                            case 'radio':
                                values[input.name] = $('input[name="gender"]:checked').value;
                                break;
                            case 'checkbox':
                                if(!input.checked)   {
                                    values[input.name] = [];
                                    return values;
                                }

                                if(Array.isArray(values[input.name]))   {
                                    values[input.name].push(input.value);
                                }
                                else    {
                                    values[input.name] = [input.value];
                                }
                                break;
                            default:
                                values[input.name] = input.value;
                        }
                        return values;
                    }, {});

                    options.onSubmit(formValues);
                }
                // Submit with default behavior
                else    {
                    formElement.submit();
                }
            }
        }




        // Xử lí lập qua mỗi rule (blur, input)
        options.rules.forEach(function(rule)    {

            // Lưu lại các rules cho mỗi input
            if(Array.isArray(selectorRules[rule.selector]))  {
                selectorRules[rule.selector].push(rule.test);
            }
            else    {
                selectorRules[rule.selector] = [rule.test];
            }

            
            var inputElements = formElement.querySelectorAll(rule.selector);

            Array.from(inputElements).forEach(function(inputElement){
                    // User typing input Element
                    inputElement.oninput = function()   {
                        getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
                        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
                        errorElement.innerText = '';
                    }
    
                    // Xử lí TH blur ra khỏi input
                    inputElement.onblur = function()    {
                        validate(inputElement, rule);
                    }
            })


        })
    }
}

// Định nghĩa rules
// 1. Khi có lỗi thì trả ra mes lỗi
// 2. Khi hợp lệ thì không trả
Validator.isRequired = function(selector, message)   {
    return  {
        selector: selector,
        test: function(value)    {
            return value ? undefined :message || 'Vui lòng nhập trường này';
        }  
    };
}

Validator.isEmail = function(selector, message)  {
    return  {
        selector: selector,
        test: function(value)    {
            const re =
                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            return re.test(value) ? undefined : message || 'Trường này phải là Email';
        }  
    };
}

Validator.minLength = function(selector, minLength, message)  {
    return  {
        selector: selector,
        test: function(value)    {
            return value.length >= minLength ? undefined :message || `Tối thiểu phải là ${minLength} ký tự`;
        }  
    };
}

Validator.isConfirmed = function(selector, getConfirmValue, message)  {
    return  {
        selector: selector,
        test: function(value)    {
            return value == getConfirmValue() ? undefined :message || 'Giá trị nhập vào không chính xác';
        }  
    };
}
