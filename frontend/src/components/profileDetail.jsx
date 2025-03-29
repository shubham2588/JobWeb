import { useLocation, useNavigate, useParams } from "react-router-dom";

const ProfileDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const item = location.state?.item;

  if (!item) {
    return <p className="text-center text-red-500">Profile not found!</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <button onClick={() => navigate(-1)} className="mb-4 text-blue-500">
        ← Back
      </button>

      {item.logo || item.profile?.profilePhoto ? (
        <img
          src={item.logo || item.profile?.profilePhoto}
          alt={item.name || item.fullname}
          className="w-32 h-32 rounded-full object-cover mx-auto"
        />
      ) : (
        <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
          <span className="text-gray-500">No Image</span>
        </div>
      )}

      <h2 className="text-2xl font-bold text-center mt-4">
        {item.name || item.fullname}
      </h2>

      {item.description && (
        <p className="text-center mt-2">{item.description}</p>
      )}
    </div>
  );
};

export default ProfileDetail;
