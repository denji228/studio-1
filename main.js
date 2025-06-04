document.getElementById('videoImage').addEventListener('click', function(){
    console.log('image is clicked');
 })
window.addEventListener('DOMContentLoaded', () => {
    $("a[href*='#']").on("click", function(e){
      const anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: $(anchor.attr('href')).offset().top
      }, 777);
      e.preventDefault();
      return false;
    });
  })

  function Form ({ option }) {
    return (
      <form className='account-form' onSubmit={(evt) => evt.preventDefault()}>
        <div className={'account-form-fields ' + (option === 1 ? 'sign-in' : (option === 2 ? 'sign-up' : 'forgot')) }>
          <input id='email' name='email' type='email' placeholder='E-mail' required />
          <input id='password' name='password' type='password' placeholder='Password' required={option === 1 || option === 2 ? true : false} disabled={option === 3 ? true : false} />
          <input id='repeat-password' name='repeat-password' type='password' placeholder='Repeat password' required={option === 2 ? true : false} disabled={option === 1 || option === 3 ? true : false} />
        </div>
        <button className='btn-submit-form' type='submit'>
          { option === 1 ? 'Sign in' : (option === 2 ? 'Sign up' : 'Reset password') }
        </button>
      </form>
    )
  }
  
  function App () {
    const [option, setOption] = React.useState(1)
    
    return (
      <div className='container'>
        <header>
          <div className={'header-headings ' + (option === 1 ? 'sign-in' : (option === 2 ? 'sign-up' : 'forgot')) }>
            <span>Sign in to your account</span>
            <span>Create an account</span>
            <span>Reset your password</span>
          </div>
        </header>
        <ul className='options'>
          <li className={option === 1 ? 'active' : ''} onClick={() => setOption(1)}>Sign in</li>
          <li className={option === 2 ? 'active' : ''} onClick={() => setOption(2)}>Sign up</li>
          <li className={option === 3 ? 'active' : ''} onClick={() => setOption(3)}>Forgot</li>
        </ul>
        <Form option={option} />
        <footer>
          <a href='' target='_blank'></a>
        </footer>
      </div>
    )
  }
  
  ReactDOM.render(<App />, document.getElementById('app'))
  window.onload = function() {
    (function() {
        const inputText = document.querySelectorAll('.auth-form__input');

        inputText.forEach( function(input) {
            input.addEventListener('focus', function() {
                this.classList.add('focus');
                this.parentElement.querySelector('.auth-form__placeholder').classList.add('focus');
            });
            input.addEventListener('blur', function() {
                this.classList.remove('focus');
                if (! this.value) {
                    this.parentElement.querySelector('.auth-form__placeholder').classList.remove('focus');
                }
            });
        });
    })();

    (function() {
        const togglers = document.querySelectorAll('.password-toggler');

        togglers.forEach( function(checkbox) {
            checkbox.addEventListener('change', function() {

                const toggler = this.parentElement,
                      input   = toggler.parentElement.querySelector('.input-password'),
                      icon    = toggler.querySelector('.auth-form__icon');

                if (checkbox.checked) {
                    input.type = 'text';
                    icon.classList.remove('la-eye')
                    icon.classList.add('la-eye-slash');
                }

                else
                {
                    input.type = 'password';
                    icon.classList.remove('la-eye-slash')
                    icon.classList.add('la-eye');
                }
            });
        });
    })();

    (function() {
        const validEmail = 'test@example.com',
              validPassword = 'qwerty123';
        
        document.body.querySelector('.hint')
                     .innerHTML = `<p>${validEmail}</p><p>${validPassword}</p>`;

        document.forms['form-auth'].addEventListener('submit', function(e) {
            e.preventDefault();

            const answerContainer = this.querySelector('.auth-form__answer'),
                  email = this.elements.email.value,
                  password = this.elements.password.value;

            const placeholders = document.querySelectorAll('.auth-form__placeholder');

            if (email == validEmail && password == validPassword) {
                answerContainer.innerHTML = '<span class="text-success">you\'ve been logged successfully</span>';
            }

            else {
                placeholders.forEach(function(placeholder) {
                    placeholder.classList.remove('focus');
                });
                this.elements.email.value = '';
                this.elements.password.value = '';
                answerContainer.innerHTML = '<span class="text-danger">invalid email or password</span>';
            }
        });
    })();
};