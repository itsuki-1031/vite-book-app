import { useState, useEffect } from "react"
import { url } from '../const';
// import { useCookies } from "react-cookie";
import { useNavigate,  Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loginSuccess, authChecked } from './store/authSlice';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios"

export const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(null); // true:成功, false:失敗, null:未表示

    const validationSchema = Yup.object({
        email: Yup.string()
        .email("有効なメールアドレスを入力してください")
        .required("メールアドレスは必須です"),
        password: Yup.string().required("パスワードは必須です"),
    });


    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
        navigate("/");
        }
    }, [navigate]);

    const onSubmit = (values, { setSubmitting, setFieldError }) => {
        axios
        .post(`${url}/signin`, {
          email: values.email,
          password: values.password,
        })
        .then((res) => {
            localStorage.setItem("token", res.data.token); // ← ここに変更
            localStorage.setItem("username", res.data.name);
            //App.jsxと同じか似たコードを書いてユーザー情報を取得する
            console.log("ログインAPIのレスポンス:", res.data);
            dispatch(loginSuccess({
                token: res.data.token,
                username: res.data.name,
            }));
            dispatch(authChecked());
            setMessage('ログイン成功！');
            setIsSuccess(true); // 成功表示も忘れずに
            setTimeout(() => {
              navigate("/");
            }, 2000);
        })
          .catch((err) => {
          if (err.response?.data?.message) {
            setFieldError("general", `ログインに失敗しました: ${err.response.data.message}`);
          } else {
            setFieldError("general", `ログインに失敗しました。${err.message}`);
          }
          setMessage('登録に失敗しました。もう一度お試しください。');
          setSubmitting(false);
          setIsSuccess(false);
        });
    };
    return(
    <main className = "login">
        {isSuccess !== null && (
            <div 
             className={`message-box ${isSuccess ? 'success' : 'error'}`}
             style={{
                backgroundColor: isSuccess ? '#d4edda' : '#f8d7da',
                color: isSuccess ? '#155724' : '#721c24',
                border: `1px solid ${isSuccess ? '#c3e6cb' : '#f5c6cb'}`,
                padding: '10px',
                marginBottom: '15px',
                borderRadius: '4px',
                }}
            >
                {message}
            </div>
        )}
                <h2>ログイン</h2>
                <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                >
                    {({ isSubmitting, errors }) => (
                        <Form>
                            {errors.general && <p className="error-message">{errors.general}</p>}
                            <label htmlFor='email' className="email-label">メールアドレス</label>
                            <Field id = "email" type="email" name="email" className="login-email" />
                            <ErrorMessage name="email" component="p" className="error-message" />
                            <br />
                            <label htmlFor='password' className="password-label">パスワード</label>
                            <Field id = "password" type="password" name="password" className="login-password" />
                            <ErrorMessage name="password" component="p" className="error-message" />
                            <button type="submit" className="login-button" disabled={isSubmitting}>
                                ログイン
                            </button>
                            <p>
                                <Link to="/signup">新規登録はこちら</Link>
                            </p>
                        </Form>
                    )}
                </Formik>
            </main>
    )
};
