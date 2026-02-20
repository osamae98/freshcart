'use client';

import { faFacebook, faGoogle} from '@fortawesome/free-brands-svg-icons';
import { faSpinner, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { signupSchema, SignupFormValues } from '../../schemas/signup.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import signupAction from '../../server/signup.actions';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function SignupForm() {

    const router = useRouter();

    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<SignupFormValues>({
        defaultValues: {
                name: '',
                email: '',
                password: '',
                rePassword: '',
                phone: '',
                terms: false
        },

        resolver: zodResolver(signupSchema),

        mode: 'onSubmit',
        reValidateMode: 'onChange',
    })

      const onSubmit: SubmitHandler<SignupFormValues> = async (values) => {
        try {
            const response = await signupAction(values);
            if (response?.success) {
                toast.success(response.message);
                setTimeout(() => {
                    router.push("/login");
                }, 2000);
            } else {
                if (response?.errors) {
                    Object.keys(response.errors).forEach((key) => { // <-- was `errors` (form errors), should be `response.errors`
                        const message = response.errors[key];
                        setError(key as keyof SignupFormValues, { message });
                    });
                }
            }
        } catch (error) {
            console.error("Signup failed:", error);
        }
    };
    return (
        <>
        <div>
        <div className='bg-white rounded-2xl shadow-lg px-6 py-10'>
            <h2 className='text-center text-3xl font-semibold mb-2'>Create Your Account</h2>
            <p className='text-center'>Start your fresh journey with us today</p>
        </div>

        <div className='register-options flex gap-2 *:grow my-10'>
            <button className='btn bg-transparent border border-gray-300 hover:bg-gray-100 flex justify-between'>
                <FontAwesomeIcon icon={faGoogle} className='text-red-600 me-2' />
                <span>Google</span>
            </button>
            <button className='btn bg-transparent border border-gray-300 hover:bg-gray-100 flex justify-between'>
                <FontAwesomeIcon icon={faFacebook} className='text-blue-600 me-2' />
                <span>Facebook</span>
            </button>
        </div>

        <div className='divider relative w-full h-0.5 bg-gray-300/30 my-4 flex items-center'>
        <span className='sr-only'>or</span>
        </div>

        <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-2'>
                <label htmlFor='name'>Name</label>
                <input
                    type='text'
                    className='form-control'
                    placeholder='Ali'
                    id='name'
                    { ...register("name")}
                    />

                    {errors.name && (
                    <p className='text-red-500 mt-0.5'>{errors.name.message}</p>
                    )}
            </div>

            <div className='flex flex-col gap-2'>
                <label htmlFor='email'>Email</label>
                <input
                    type='email'
                    className='form-control'
                    placeholder='ali@example.com'
                    id='email'
                    { ...register("email")}
                    />

                    {errors.email && (
                    <p className='text-red-500 mt-0.5'>{errors.email.message}</p>
                    )}
            </div>

            <div className='flex bg-light flex-col gap-2'>
                <label htmlFor='password'>Password</label>
                <input
                    type='password'
                    className='form-control'
                    placeholder='create a strong password'
                    autoComplete='off'
                    id='password'
                    { ...register("password")}
                    />

                    {errors.password && (
                    <p className='text-red-500 mt-0.5'>{errors.password.message}</p>
                    )}

                    <div className='password-requirements'>
                <div className='flex items-center gap-2'>
                    <div className='bar grow h-1 bg-gray-200 rounded-md overflow-hidden'>
                        <div className={`progress bg-orange-500 w-50 h-full`}></div>
                    </div>
                    <span>Fair</span>
                </div>
            </div>

            <p className='text-gray-500 -mt-2 text-xs'>
                Must be at least 8 characters with numbers and symbols
            </p>
            </div>

            

            <div className='flex flex-col gap-2'>
                <label htmlFor='rePassword'>Confirm Password*</label>
                <input
                    type='password'
                    className='form-control'
                    placeholder='confirm your password'
                    autoComplete='off'
                    id='rePassword'
                    { ...register("rePassword")}
                    />

                    {errors.rePassword && (
                    <p className='text-red-500 mt-0.5'>{errors.rePassword.message}</p>
                    )}
            </div>

            <div className='flex flex-col gap-2'>
                <label htmlFor='phone'>Phone Number*</label>
                <input
                    type='tel'
                    className='form-control'
                    placeholder='+1 234 567 8900'
                    id='phone'
                    { ...register("phone")}
                    />

                    {errors.phone && (
                    <p className='text-red-500 mt-0.5'>{errors.phone.message}</p>
                    )}
            </div>

            <div>
                <div className='flex items-center gap-2'>
                    <input
                        type='checkbox'
                        id='terms'
                        { ...register("terms")}
                        className='size-4 accent-primary-600'
                        />
                    <label htmlFor='terms' className='ms-2'>
                        I agree to the{" "}
                        <Link href={`/terms`} className='text-primary-600'>
                        Terms of service
                        </Link>
                        and{" "}
                        <Link href={`/privacy-policy`} className='text-primary-600'>
                        Privacy Policy
                        </Link>
                        *
                    </label>
                </div>

                {errors.terms && (
                    <p className='text-red-500 mt-0.5'>{errors.terms.message}</p>
                    )}
            </div>
               
           
           <button
                type='submit'
                disabled={isSubmitting}
                className='btn bg-primary-600 text-white hover:bg-primary-700 cursor-pointer disabled:cursor-not-allowed flex justify-center w-full'
                >
                {isSubmitting ? (
                    <>
                <FontAwesomeIcon icon={faSpinner} spin className='me-2' />
                <span>Creating an account</span></>
                ) : (
                    <>
                <FontAwesomeIcon icon={faUserPlus} className='me-2' />
                <span>Create My Account</span></>
                )}
            </button>
            </form>

            <p className='border-t pt-10 border-gray-300/30 my-4 text-center'>
            Already have an account?{" "}
            <Link href='/login' className='text-primary-600'>
                Sign in
            </Link>
            </p>
            </div>
        </>
    );
}