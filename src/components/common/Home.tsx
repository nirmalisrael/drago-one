import CustomButton from '@/components/ui/CustomButton'
import { MainCard } from '@/components/ui/cards/MainCard'
import { useForm } from 'react-hook-form';
import { TextInput } from '../ui';
import { Grid } from '@mui/material';
import NumberInput from '../ui/inputs/NumberInput/NumberInput';

const Home = () => {

  const { control, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: 'Disable Eg',
      bio: '',
      phoneWithCode: '',
      phoneAlt: '',
      phoneSimple: '',
      aadhaar: '',
      cardNumber: '',
      pinCode: '',
      otp: '',
      bankAccount: '',
      employeeId: '',
      amount: '',
      age: '',
      usPhone: '',
      customField: '',
    }
  });

  return (
    <MainCard title="Home" action={
      <>
        <CustomButton text="Import" type="add" />
        <CustomButton text="Add" type='add' />
      </>
    }>
      <h2>Sample Form Controls</h2>

      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <Grid container spacing={2}>
          {/* Text Input Fields */}
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <TextInput
              control={control}
              name="email"
              label="Email"
              type="email"
              autoFocus
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

          {/* Number Input Fields - Phone Numbers */}
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <NumberInput
              name="phoneWithCode"
              control={control}
              label="Indian Phone Number"
              format="PHONE_IN"
              showCountryCode={true}
              countryCode="IN"
              required
              helperText="Enter your 10-digit mobile number"
              showCharacterCount={true}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <NumberInput
              name="phoneAlt"
              control={control}
              label="Phone (Alternative)"
              format="PHONE_IN_WITH_CODE"
              placeholder="91 123 456 7890"
              maxLength={10}
              required
              showCharacterCount={true}
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

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <NumberInput
              name="usPhone"
              control={control}
              label="US Phone"
              format="PHONE_US"
              showCountryCode={true}
              countryCode="US"
              allowCountryCodeChange={true}
              helperText="US phone number with country code"
            />
          </Grid>

          {/* Identity Numbers */}
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <NumberInput
              name="aadhaar"
              control={control}
              label="Aadhaar Number"
              format="AADHAAR"
              required
              mask={true}
              helperText="Enter your 12-digit Aadhaar number"
              showCharacterCount={true}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <NumberInput
              name="ssn"
              control={control}
              label="Social Security Number"
              format="SSN"
              mask={true}
              helperText="US Social Security Number (9 digits)"
              showCharacterCount={true}
            />
          </Grid>

          {/* Payment Information */}
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <NumberInput
              name="cardNumber"
              control={control}
              label="Credit Card Number"
              format="CARD"
              maxLength={16}
              required
              helperText="16-digit card number"
              showCharacterCount={true}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <NumberInput
              name="cvv"
              control={control}
              label="CVV"
              format="CVV"
              maxLength={3}
              required
              mask={true}
              helperText="3-digit security code"
              size="small"
            />
          </Grid>

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

          {/* Security Codes */}
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <NumberInput
              name="pinCode"
              control={control}
              label="PIN Code"
              format="PIN"
              maxLength={6}
              required
              mask={true}
              helperText="6-digit PIN code"
              size="small"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <NumberInput
              name="otp"
              control={control}
              label="4-Digit OTP"
              format="OTP_4"
              maxLength={4}
              required
              helperText="Enter 4-digit OTP"
              size="small"
              showCharacterCount={true}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <NumberInput
              name="otp6"
              control={control}
              label="6-Digit OTP"
              format="OTP_6"
              maxLength={6}
              required
              helperText="Enter 6-digit OTP"
              size="small"
              showCharacterCount={true}
            />
          </Grid>

          {/* Banking Information */}
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <NumberInput
              name="bankAccount"
              control={control}
              label="Bank Account Number"
              format="ACCOUNT"
              maxLength={12}
              required
              helperText="12-digit account number"
              showCharacterCount={true}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <NumberInput
              name="routingNumber"
              control={control}
              label="Routing Number"
              format="ROUTING"
              maxLength={9}
              helperText="9-digit routing number"
              showCharacterCount={true}
            />
          </Grid>

          {/* Custom Formats */}
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <NumberInput
              name="employeeId"
              control={control}
              label="Employee ID"
              format="EMP####"
              maxLength={7}
              helperText="Employee ID format: EMP1234"
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

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <NumberInput
              name="customField"
              control={control}
              label="Custom Pattern"
              format="##-##-##"
              maxLength={6}
              helperText="Custom format: 12-34-56"
              showCharacterCount={true}
              customRules={{
                validate: {
                  custom: (value: string) => {
                    const cleanVal = value.replace(/\D/g, '');
                    return cleanVal !== '123456' || 'This number is not allowed';
                  }
                }
              }}
              onValueChange={(cleanValue, formattedValue, rawValue) => {
                console.log('Clean:', cleanValue, 'Formatted:', formattedValue, 'Raw:', rawValue);
              }}
            />
          </Grid>

          {/* Simple Number Fields */}
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <NumberInput
              name="age"
              control={control}
              label="Age"
              min={18}
              max={120}
              maxLength={3}
              required
              helperText="Age between 18-120"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <NumberInput
              name="quantity"
              control={control}
              label="Quantity"
              min={1}
              max={1000}
              maxLength={4}
              helperText="Enter quantity (1-1000)"
              size="small"
            />
          </Grid>

          {/* Decimal Examples */}
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <NumberInput
              name="price"
              control={control}
              label="Price"
              allowDecimal={true}
              allowNegative={true}
              decimalPlaces={2}
              min={-9999}
              max={9999}
              startAdornment="$"
              helperText="Price with 2 decimal places"
              inputMode="decimal"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <NumberInput
              name="percentage"
              control={control}
              label="Percentage"
              allowDecimal={true}
              decimalPlaces={1}
              min={0}
              max={100}
              endAdornment="%"
              helperText="Percentage (0-100%)"
              inputMode="decimal"
            />
          </Grid>

          {/* Advanced Examples */}
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <NumberInput
              name="advancedPhone"
              control={control}
              label="International Phone"
              format="PHONE_US"
              showCountryCode={true}
              countryCode="US"
              allowCountryCodeChange={true}
              helperText="Select country and enter phone"
              showCharacterCount={true}
              variant="filled"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <NumberInput
              name="maskedSSN"
              control={control}
              label="Masked SSN"
              format="SSN"
              mask={true}
              required
              helperText="SSN with masking toggle"
              showCharacterCount={true}
              variant="standard"
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