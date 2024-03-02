import React from 'react';
import { useReducer } from 'react';
import { BiBrush } from 'react-icons/bi';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getUser, getUsers, updateUser } from '../lib/helper';
//import Bug from './bug';
import Success from './success';

const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

export default function UpdateUserForm({ formId, formData, setFormData }) {
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery(['users', formId], () =>
    getUser(formId)
  );
  const UpdateMutation = useMutation((newData) => updateUser(formId, newData), {
    onSuccess: async (data) => {
      queryClient.setQueryData('users', (old) => [data]);
      console.log(`data updated`);
      queryClient.prefetchQuery('users', getUsers);
      window.location.reload();
    },
  });

  if (isLoading) return <div>Loading !</div>;
  if (isError) return <div>Error ! </div>;

  const { name, avatar, salary, date, email, status } = data;
  const [firstname, lastname] = name ? name.split(' ') : formData;

  // console.log(name);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let userName = `${formData.firstname ?? firstname} ${
      formData.lastname ?? lastname
    }`;

    let updated = Object.assign({}, data, formData, { name: userName });
    console.log(updated);
    await UpdateMutation.mutate(updated);
  };

 // if (Object.keys(formData).length > 0) return <Bug message="Error" />;

  return (
    <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          defaultValue={firstname}
          name="firstname"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="FirstName"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          defaultValue={lastname}
          name="lastname"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Last Name"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          defaultValue={email}
          name="email"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Email"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          defaultValue={salary}
          name="salary"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Salary"
        />
      </div>
      <div className="input-type">
        <input
          type="date"
          onChange={setFormData}
          defaultValue={date}
          name="date"
          className="border px-5 py-4 focus:outline-none rounded-md"
        />
      </div>

      <div className="flex gap-10 items-center">
        <div className="form-check">
          <input
            type="radio"
            onChange={setFormData}
            defaultChecked={status == 'Active'}
            name="status"
            value="Active"
            id="radioDefault1"
            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          />
          <label htmlFor="radioDefault1" className="inline-block text-gray-800">
            Active
          </label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            onChange={setFormData}
            defaultChecked={status !== 'Active'}
            name="status"
            value="Inactive"
            id="radioDefault1"
            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          />
          <label htmlFor="radioDefault2" className="inline-block text-gray-800">
            Inactive
          </label>
        </div>
      </div>

      <button className="flex justify-center text-md w-2/6 bg-yellow-400 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
        Update{' '}
        <span className="px-1">
          <BiBrush size={24} />
        </span>
      </button>
    </form>
  );
}
