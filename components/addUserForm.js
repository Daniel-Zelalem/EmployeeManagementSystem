import React from 'react';
import { useReducer } from 'react';
import { BiPlus } from 'react-icons/bi';
import Bug from './bug';
import Success from './success';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { addUser, getUsers } from '../lib/helper';

export default function AddUserForm({ formData, setFormData }) {
  const queryClient = useQueryClient();
  const addMutation = useMutation(addUser, {
    onSuccess: () => {
      console.log('data inserted successfully');
      queryClient.prefetchQuery('users', getUsers);
    },
  });

  function setBg() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(formData).length == 0)
      return console.log('dont have formdata');
    let { firstname, lastname, email, salary, date, status } = formData;

    const model = {
      name: `${firstname} ${lastname}`,
      avatar: `http://dummyimage.com/100x100.png/${setBg()}/ffffff`,
      email,
      salary,
      date,
      status: status ?? 'Active',
    };

    addMutation.mutate(model);
    window.location.reload();
  };

  // if (Object.keys(formData).length > 0) return <Bug message="Error" />;
  if (addMutation.isLoading) return <div>Loading!</div>;
  if (addMutation.isError) return <Bug message={addMutation.error.message} />;
  if (addMutation.isSuccess) return <Success message={'Added Successfuly'} />;

  return (
    <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          name="firstname"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="FirstName"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          name="lastname"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Last Name"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          name="email"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Email"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          name="salary"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Salary"
        />
      </div>
      <div className="input-type">
        <input
          type="date"
          onChange={setFormData}
          name="date"
          className="border px-5 py-4 focus:outline-none rounded-md"
        />
      </div>

      <div className="flex gap-10 items-center">
        <div className="form-check">
          <input
            type="radio"
            onChange={setFormData}
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

      <button className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
        Add{' '}
        <span className="px-1">
          <BiPlus size={24} />
        </span>
      </button>
    </form>
  );
}
