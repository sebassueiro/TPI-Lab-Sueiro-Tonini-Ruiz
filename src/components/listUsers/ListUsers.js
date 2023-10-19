import './ListUser.css'

const ListUsers = ({ users, deleteUserHandler }) => {
  return (
    <div className="d-flex  flex-column align-items-center w-100">
      <table className="table table-hover mx-auto text-center ">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Contraseña</th>
            <th>Tipo de usuario</th>
          </tr>
        </thead>
        {users.map((user) => (
          <tbody>
            <tr >
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.userType}</td>
              <td>
              <span onClick={() => deleteUserHandler(user.id)}>🗑️</span>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default ListUsers;
