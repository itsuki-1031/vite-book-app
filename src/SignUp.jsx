import { useState ,useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { url } from '../const';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginSuccess } from './store/authSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import Compressor from 'compressorjs';

export const SignUp = () => {
    const [,setCookie] = useCookies(['token']);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [icon, setIcon] = useState(null); // ← アイコン画像の状態
    const initialValues = {
      email: '',
      password: '',
      name: '',
    };

    const validationSchema = Yup.object({
      email: Yup.string().email('無効なメール形式です').required('メールアドレスは必須です'),
      password: Yup.string().min(6, '6文字以上で入力してください').required('パスワードは必須です'),
      name: Yup.string().required('ユーザー名は必須です'),
    });

    useEffect(() => {
            const token = localStorage.getItem("token");
            if (token) {
              navigate("/");
            }
        }, [navigate]);

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
  
      // Compressor.js で画像を圧縮
      new Compressor(file, {
        quality: 0.6,
        maxWidth: 300,
        success(result) {
          setIcon(result); // 圧縮された画像を state に保存
        },
        error(err) {
          console.error('画像の圧縮に失敗:', err);
        },
      });
    };

    const onSubmit = (values, { setSubmitting, setFieldError }) => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('password', values.password);
      if (icon) {
        formData.append('icon', icon); // ← ここで画像ファイルも送る
      }
      axios
        .post(
          `${url}/users`,
          {
            name: values.name,
            email: values.email,
            password: values.password,
          })
        .then((res) => {
          const token = res.data.token;
          localStorage.setItem("token", res.data.token); 
          // const usernameToDisplay = values.name;
          // localStorage.setItem("username", usernameToDisplay);
          localStorage.setItem("username", res.data.username);
          setCookie('token', res.data.token);
          dispatch(loginSuccess({
            token: res.data.token,
            username: res.data.username,
            // username: usernameToDisplay, // フォーム入力値のnameを設定
            // username: res.data.name,//これはログインAPIにnameがあったらできる
            // APIがnameを返さないため、フォーム入力値のnameをユーザー名として使う
          }));
          setSubmitting(false); // フォーム送信状態を解除

          if (icon) {
            const formData = new FormData();
            formData.append('icon', icon);
      
            return axios.post(`${url}/uploads`, formData, {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
              },
            })
            .then(() => {
              navigate('/')
            })
          };
        })
        .catch((err) => {
          if (err.response?.status === 409) {
            setFieldError('email', 'このメールアドレスは既に登録されています');
          } else {
            setFieldError('email', '登録に失敗しました。もう一度お試しください');
          }
          setSubmitting(false);
        });
      };

    return(
      <main className='signup'>
        <h2>サインイン</h2>
            <Formik initialValues={initialValues} validationSchema={validationSchema} 
            onSubmit={onSubmit}>
              {({ isSubmitting }) => (
                <Form className="signup-form">
                <label className="email-label">メールアドレス</label>
                <Field type="email" name="email" className="email-input" />
                <ErrorMessage name="email" component="p" className="error-message" />
                <br />
                <label className="name-label">ユーザー名</label>
                <Field type="text" name="name" className="name-input" />
                <ErrorMessage name="name" component="p" className="error-message" />
                <br />
                <label className="password-label">パスワード</label>
                <Field type="password" name="password" className="password-input" />
                <ErrorMessage name="password" component="p" className="error-message" />
                <br />
                <label>ユーザーアイコン</label>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                <button type="submit" className="signup-button" disabled={isSubmitting}>
                  新規作成
                </button>
                <p>
                  アカウントをお持ちですか？ <Link to="/login">ログインはこちら</Link>
                </p>
              </Form>
            )}
            </Formik>
          </main>
    )
  }
  //ブログでアウトプット
  //最初に問題定義(やりたい事)→結論(こうやったら出来た)→なぜ？(疑問に思った事)深掘りして行って
  //最後に自分で納得した(理解した)事を書く