###  PROJECT STRUCTURE

#### Rule#1: Tổ chức theo features

- **assets**: chứa tài static content như images, audio, video, css file ...
- **components**: chứa các React components để xây dựng nên giao diện cho ứng dụng.
- **pages**: là các React components đặc biệt hơn. 1 page đại diện cho 1 trang web khi người dùng truy cập như (Home Page, Account Page, Admin Page ...)
- **services**: xử lý business logic. 
- **store**: lưu redux global state. Quản lý golbal state của ứng dụng.

```javascript
src/
   assets/
   components/
      Button/
      Notifications/
	     components/     
            ButtonDismiss/
               index.js  
   pages/
      Home/
         components/
         services/
            processData/
               index.js
         index.js
      layout/
         index.js
         default.js
      routes/
         index.js
	  app.js
      index.js
   services/
      api/
      firebase/
         context.js
		 firebase.js
		 index.js
      session/
         actions.js
         reducer.js
         index.js
      users/
         actions.js
         reducer.js
         index.js
      messages/
         actions.js
         reducer.js
         index.js
   store.js // global state
   index.js //
```

#### Rule#2: Chú ý đến module boundaries

- Các global components (nằm ngay bên trong folder components) có thể được tái sử dụng ở bất kỳ đâu. Các component còn lại phải tuân thủ nguyên tắc: chỉ truy cập được từ parent component.

#### Rule#3: Tránh circular dependencies

### Naming Convention 

