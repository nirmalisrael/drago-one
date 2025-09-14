import CustomButton from '@/components/ui/button/CustomButton'
import { useForm } from 'react-hook-form';
import { NumberInput, TextInput } from '../ui';
import { Grid } from '@mui/material';
import MainCard from '../ui/cards';

type FormData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneSimple: string;
  phoneNumber: string;
  usPhoneNumber: string;
  aadhaar: string;
  cardNumber: string;
  cvv: string;
  otp: string;
  employeeId: string;
  customPattern: string;
  amount: string;
  age: string;
};

const Home = () => {

  const { control, handleSubmit, formState: { isSubmitting } } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: 'Disable Eg.',
      phoneSimple: '',
      phoneNumber: '',
      usPhoneNumber: '',
      aadhaar: '',
      cardNumber: '',
      cvv: '',
      otp: '',
      employeeId: '',
      customPattern: '',
      amount: '',
      age: '',
    }
  });

  const onSubmit = (data: FormData) => {
    console.log('Form Data:', data);
  };

  return (
    <MainCard title="Form Input Examples" action={
      <>
        <CustomButton text="Import" type="add" />
        <CustomButton text="Add" type='add' />
      </>
    }>
      <h2>Essential Number Input Controls</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>

          {/* Basic Text Input for comparison */}
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <TextInput
              control={control}
              name="email"
              label="Email"
              type="email"
              required
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <TextInput
              control={control}
              name="password"
              label="Password"
              type="password"
              required
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <TextInput
              control={control}
              name="firstName"
              label="First Name"
              required
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <TextInput
              control={control}
              name="lastName"
              label="Last Name"
              required
              disabled
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <NumberInput
              name="phoneSimple"
              control={control}
              label="Phone Simple"
              format="PHONE_BASIC"
              maxLength={10}
              required
              helperText="10-digit phone number without formatting"
            />
          </Grid>

          {/* Phone Number with Country Code */}
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <NumberInput
              name="phoneNumber"
              control={control}
              label="Phone Number"
              format="PHONE_IN"
              showCountryCode={true}
              countryCode="IN"
              required
              helperText="Enter your 10-digit mobile number"
            // showCharacterCount={true}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <NumberInput
              name="usPhoneNumber"
              control={control}
              label="Phone Number"
              countryCode='IN'
              format='PHONE_IN'
              showCountryCode={true}
              allowCountryCodeChange={true}
              required
              helperText="Enter your mobile number"
              showCharacterCount={true}
            />
          </Grid>

          {/* Aadhaar Number (Formatted + Masked) */}
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <NumberInput
              name="aadhaar"
              control={control}
              label="Aadhaar Number"
              format="AADHAAR"
              required
              mask={true}
              helperText="Enter your 12-digit Aadhaar number"
            // showCharacterCount={true}
            />
          </Grid>

          {/* Credit Card Number */}
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <NumberInput
              name="cardNumber"
              control={control}
              label="Credit Card Number"
              format="CARD"
              required
              helperText="Enter your card number"
            // showCharacterCount={true}
            />
          </Grid>

          {/* CVV (Simple maxLength) */}
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <NumberInput
              name="cvv"
              control={control}
              label="CVV"
              maxLength={4}
              required
              mask={true}
              helperText="3 or 4-digit security code"
            // showCharacterCount={true}
            />
          </Grid>

          {/* OTP (Simple maxLength) */}
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <NumberInput
              name="otp"
              control={control}
              label="OTP"
              maxLength={6}
              required
              helperText="Enter 6-digit OTP"
            // showCharacterCount={true}
            />
          </Grid>

          {/* Employee ID (Custom Pattern with Prefix) */}
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <NumberInput
              name="employeeId"
              control={control}
              label="Employee ID"
              format={'EMPLOYEE_ID'}
              helperText="Employee ID format: EMP1234"
              // showCharacterCount={true}
              customRules={{
                validate: {
                  custom: (value: string) => {
                    const cleanVal = value.replace(/\D/g, '');
                    return cleanVal.length === 4 || 'Employee ID must be 4 digits';
                  }
                }
              }}
            />
          </Grid>

          {/* Custom Pattern (Dash separated) */}
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <NumberInput
              name="customPattern"
              control={control}
              label="Custom Pattern"
              format="##-##-##"
              helperText="Custom format: 12-34-56"
              // showCharacterCount={true}
              onValueChange={(cleanValue, formattedValue, rawValue) => {
                console.log('Clean:', cleanValue, 'Formatted:', formattedValue, 'Raw:', rawValue);
              }}
            />
          </Grid>

          {/* Age (Min/Max validation) */}
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <NumberInput
              name="age"
              control={control}
              label="Age"
              min={18}
              max={120}
              required
              helperText="Age between 18-120"
            />
          </Grid>

          {/* Amount (Decimal with currency symbol) */}
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <NumberInput
              name="amount"
              control={control}
              label="Amount"
              allowDecimal={true}
              decimalPlaces={2}
              min={0}
              max={999999}
              startAdornment="₹"
              helperText="Enter amount in rupees"
              inputMode="decimal"
            />
          </Grid>

          {/* Action Buttons */}
          <Grid size={{ xs: 12 }}>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <CustomButton
                  text="Submit"
                  type="submit"
                  isLoading={isSubmitting}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <CustomButton
                  text="Cancel"
                  type="back"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>

        </Grid>
      </form>
    </MainCard>
  )
}

export default Home