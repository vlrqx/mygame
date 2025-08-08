import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Tab, Tabs, Alert } from 'react-bootstrap';
import './AuthPage.css'; // Создадим этот файл для кастомных стилей

const AuthPage = ({ signupHandler, signinHandler }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    const newErrors = {};
    
    if (activeTab === 'register' && !formData.name.trim()) {
      newErrors.name = 'Имя обязательно';
    }
    
    if (!formData.email.includes('@')) {
      newErrors.email = 'Некорректный email';
    }
    
    if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен быть не менее 6 символов';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    setAuthError('');
    
    if (!validate()) return;
    
    try {
      if (activeTab === 'register') {
        await signupHandler(e,formData);
      } else {
        await signinHandler(e,{ email: formData.email, password: formData.password });
      }
    } catch (error) {
      setAuthError(error.message || 'Произошла ошибка');
    }
  };

  return (
    <Container fluid className="auth-container d-flex align-items-center justify-content-center" >
      <Row className="justify-content-center w-100">
        <Col xl={4} lg={5} md={6} sm={8}>
          <Card className="auth-card shadow-lg border-0 overflow-hidden">
            <div className="auth-card-header">
              <h2 className="text-center text-white mb-0 py-3">
                {activeTab === 'login' ? 'Добро пожаловать!' : 'Создать аккаунт'}
              </h2>
            </div>
            
            <Card.Body className="p-4">
              

              {authError && (
                <Alert variant="danger" className="rounded-pill text-center">
                  {authError}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                {activeTab === 'register' && (
                  <Form.Group className="mb-3">
                    <Form.Label className="form-label">Имя</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      isInvalid={!!errors.name}
                      placeholder="Ваше имя"
                      className="rounded-pill border-0 bg-light"
                    />
                    <Form.Control.Feedback type="invalid" className="ps-3">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                )}

                <Form.Group className="mb-3">
                  <Form.Label className="form-label">Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                    placeholder="example@mail.com"
                    className="rounded-pill border-0 bg-light"
                  />
                  <Form.Control.Feedback type="invalid" className="ps-3">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="form-label">Пароль</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                    placeholder="Не менее 6 символов"
                    className="rounded-pill border-0 bg-light"
                  />
                  <Form.Control.Feedback type="invalid" className="ps-3">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 mb-3 rounded-pill py-2 auth-btn"
                >
                  {activeTab === 'login' ? 'Войти' : 'Зарегистрироваться'}
                </Button>

                <div className="text-center mt-4">
                  {activeTab === 'login' ? (
                    <p className="text-muted">
                      Нет аккаунта?{' '}
                      <Button
                        variant="link"
                        onClick={() => setActiveTab('register')}
                        className="auth-switch-btn p-0"
                      >
                        Создайте его
                      </Button>
                    </p>
                  ) : (
                    <p className="text-muted">
                      Уже есть аккаунт?{' '}
                      <Button
                        variant="link"
                        onClick={() => setActiveTab('login')}
                        className="auth-switch-btn p-0"
                      >
                        Войти
                      </Button>
                    </p>
                  )}
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthPage;