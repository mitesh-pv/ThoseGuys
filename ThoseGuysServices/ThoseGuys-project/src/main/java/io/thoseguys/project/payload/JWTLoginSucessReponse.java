package io.thoseguys.project.payload;

public class JWTLoginSucessReponse {
    private boolean success;
    private String token;
    private String fullName;

    public JWTLoginSucessReponse() {
    }

    public JWTLoginSucessReponse(boolean success, String token, String fullName) {
        this.success = success;
        this.token = token;
        this.fullName = fullName;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    @Override
    public String toString() {
        return "JWTLoginSucessReponse{" +
                "success=" + success +
                ", token='" + token + '\'' +
                '}';
    }
}
