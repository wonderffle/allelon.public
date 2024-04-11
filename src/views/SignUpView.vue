<script lang="ts">
  export default {
    data(){
      return {
        submitting: false,
        success: false,
        organization: {
          name: '',
          website: '',
          street1: '',
          street2: '',
          city: '',
          region: '',
          postal_code: '',
          subdomain: ''
        },
        household: {
          street1: '',
          street2: '',
          city: '',
          region: '',
          postal_code: ''
        },
        person: {
          first_name: '',
          last_name: '',
          email: '',
          email_confirmation: ''
        },
        response: {
          errors: {
            organization: {
              name: [],
              website: [],
              subdomain: [],
              street1: [],
              street2: [],
              city: [],
              region: [],
              postal_code: []
            },
            household: {
              street1: [],
              street2: [],
              city: [],
              region: [],
              postal_code: []
            },
            person: {
              first_name: [],
              last_name: [],
              email: [],
              email_confirmation: []
            }
          }
        }
      }
    },
    methods: {
      async registerOrganization() {
        this.submitting = true;

        fetch(`https://${import.meta.env.VITE_API_URI}/organizations`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/vnd.allelon.v1"
          },
          body: JSON.stringify({ organization: this.organization, household: this.household, person: this.person })
        })
        .then(response => {
          this.success = response.status === 201
          return response.json();
        })
        .then(data => {
          this.response = data;
          this.submitting = false;
        }).catch(error => {
          console.error(error);
          this.submitting = false;
        })
      }
    }
  }
</script>

<template>
  <div class="container mx-auto p-12">
    <div v-if="success" class="text-center">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mx-auto w-16 h-16">
        <path stroke-linecap="round" stroke="green" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
      </svg>
      <div class="text-lg">
        Thank you for registering. Instructions for accessing your account have been sent to <span class="font-bold">{{ person.email }}</span>.
      </div>
    </div>
    <form v-if="!success" v-on:submit.prevent="registerOrganization">
      <div class="mb-10 pb-10 lg:grid lg:grid-cols-2 border-b border-gray-900/10">
        <div class="lg:pr-10">
          <h2 class="text-base font-semibold leading-7 text-gray-900">Church Information</h2>
          <p class="mt-1 text-sm leading-6 text-gray-600">Tell us about your church.</p>
        </div>
        <div>
          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-full">
              <label for="name" class="block text-sm font-medium leading-6 text-gray-900 required">Name</label>
              <div class="mt-2">
                <input type="text" required v-model="organization.name" name="organization[name]" id="name" autocomplete="name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              </div>
              <div class="text-red-500 text-sm">
                {{ response.errors.organization?.name?.shift() }}
              </div>
            </div>

            <div class="col-span-full">
              <label for="street1" class="block text-sm font-medium leading-6 text-gray-900">Street address</label>
              <div class="mt-2">
                <input type="text" required v-model="organization.street1" name="organization[street1]" id="street1" autocomplete="street1" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              </div>
              <div class="text-red-500 text-sm">
                {{ response.errors.organization?.street1?.shift() }}
              </div>
            </div>

            <div class="col-span-full">
              <div class="mt-2">
                <input type="text" v-model="organization.street2" name="organization[street2]" id="street2" autocomplete="street2" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              </div>
              <div class="text-red-500 text-sm">
                {{ response.errors.organization?.street2?.shift() }}
              </div>
            </div>

            <div class="sm:col-span-2 sm:col-start-1">
              <label for="city" class="block text-sm font-medium leading-6 text-gray-900">City</label>
              <div class="mt-2">
                <input type="text" required v-model="organization.city" name="organization[city]" id="city" autocomplete="address-level2" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              </div>
              <div class="text-red-500 text-sm">
                {{ response.errors.organization?.city?.shift() }}
              </div>
            </div>

            <div class="sm:col-span-2">
              <label for="region" class="block text-sm font-medium leading-6 text-gray-900">State / Province</label>
              <div class="mt-2">
                <select id="region" v-model="organization.region" name="organization[region]" autocomplete="address-level1" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AR">Arkansas</option>
                  <option value="AZ">Arizona</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Deleware</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachussets</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SD">South Dakota</option>
                  <option value="SC">South Carolina</option>
                  <option value="TE">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="DC">Washington, D.C.</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </select>
              </div>
              <div class="text-red-500 text-sm">
                {{ response.errors.organization?.region?.shift() }}
              </div>
            </div>

            <div class="sm:col-span-2">
              <label for="postal-code" class="block text-sm font-medium leading-6 text-gray-900">ZIP / Postal code</label>
              <div class="mt-2">
                <input type="text" required v-model="organization.postal_code" name="organization[postal_code]" id="postal-code" autocomplete="postal-code" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              </div>
              <div class="text-red-500 text-sm">
                {{ response.errors.organization?.postal_code?.shift() }}
              </div>
            </div>

            <div class="sm:col-span-4">
              <label for="website" class="block text-sm font-medium leading-6 text-gray-900">Website</label>
              <div class="mt-2">
                <input id="website" v-model="organization.website" name="organization[website]" type="text" autocomplete="website" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              </div>
              <div class="text-red-500 text-sm">
                {{ response.errors.organization?.website?.shift() }}
              </div>
            </div>

            <div class="sm:col-span-4">
              <label for="subdomain" class="block text-sm font-medium leading-6 text-gray-900">Subdomain</label>
              <div class="mt-2">
                <input id="subdomain" required v-model="organization.subdomain" name="organization[subdomain]" type="text" autocomplete="subdomain" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              </div>
              <div class="text-red-500 text-sm">
                {{ response.errors.organization?.subdomain?.shift() }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mb-10 pb-10 lg:grid lg:grid-cols-2 border-b border-gray-900/10">
        <div class="lg:pr-10">
          <h2 class="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
          <p class="mt-1 text-sm leading-6 text-gray-600">Tell us about the person who will initially be the primary administrator of your church's account.</p>
        </div>
        <div>
          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">First name</label>
              <div class="mt-2">
                <input type="text" required v-model="person.first_name" name="person[first_name]" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              </div>
              <div class="text-red-500 text-sm">
                {{ response.errors.household && response.errors.person?.first_name?.shift() }}
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Last name</label>
              <div class="mt-2">
                <input type="text" required v-model="person.last_name" name="person[last_name]" id="last-name" autocomplete="family-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              </div>
              <div class="text-red-500 text-sm">
                {{ response.errors.household && response.errors.person?.last_name?.shift() }}
              </div>
            </div>

            <div class="sm:col-span-4">
              <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
              <div class="mt-2">
                <input id="email" required v-model="person.email" name="person[email]" type="email" autocomplete="email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              </div>
              <div class="text-red-500 text-sm">
                {{ response.errors.household && response.errors.person?.email?.shift() }}
              </div>
            </div>

            <div class="sm:col-span-4">
              <label for="email_confirmation" class="block text-sm font-medium leading-6 text-gray-900">Confirm email address</label>
              <div class="mt-2">
                <input id="email_confirmation" required v-model="person.email_confirmation" name="person[email_confirmation]" type="email" autocomplete="email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              </div>
              <div class="text-red-500 text-sm">
                {{ response.errors.household && response.errors.person?.email_confirmation?.shift() }}
              </div>
            </div>

            <div class="col-span-full">
              <label for="household-street1" class="block text-sm font-medium leading-6 text-gray-900">Street address</label>
              <div class="mt-2">
                <input type="text" required v-model="household.street1" name="household[street1]" id="household-street1" autocomplete="street1" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              </div>
              <div class="text-red-500 text-sm">
                {{ response.errors.household?.street1?.shift() }}
              </div>
            </div>

            <div class="col-span-full">
              <div class="mt-2">
                <input type="text" v-model="household.street2" name="household[street2]" id="household-street2" autocomplete="street2" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              </div>
              <div class="text-red-500 text-sm">
                {{ response.errors.household?.street2?.shift() }}
              </div>
            </div>

            <div class="sm:col-span-2 sm:col-start-1">
              <label for="household-city" class="block text-sm font-medium leading-6 text-gray-900">City</label>
              <div class="mt-2">
                <input type="text" required v-model="household.city" name="household[city]" id="household-city" autocomplete="address-level2" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              </div>
              <div class="text-red-500 text-sm">
                {{ response.errors.household?.city?.shift() }}
              </div>
            </div>

            <div class="sm:col-span-2">
              <label for="household-region" class="block text-sm font-medium leading-6 text-gray-900">State / Province</label>
              <div class="mt-2">
                <select id="household-region" v-model="household.region" name="household[region]" autocomplete="address-level1" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AR">Arkansas</option>
                  <option value="AZ">Arizona</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Deleware</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachussets</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SD">South Dakota</option>
                  <option value="SC">South Carolina</option>
                  <option value="TE">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="DC">Washington, D.C.</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </select>
              </div>
              <div class="text-red-500 text-sm">
                {{ response.errors.household?.region?.shift() }}
              </div>
            </div>

            <div class="sm:col-span-2">
              <label for="household-postal-code" class="block text-sm font-medium leading-6 text-gray-900">ZIP / Postal code</label>
              <div class="mt-2">
                <input type="text" required v-model="household.postal_code" name="household[postal_code]" id="household-postal-code" autocomplete="postal-code" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              </div>
              <div class="text-red-500 text-sm">
                {{ response.errors.household?.postal_code?.shift() }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-6 text-center gap-x-6">
        <!--button type="button" class="text-sm font-semibold leading-6 text-gray-900 mr-6">Cancel</button-->
        <button :disabled="submitting" type="submit" class="inline-flex items-center rounded-md bg-indigo-600 px-6 py-4 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          <svg v-if="submitting" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Register
        </button>
      </div>
    </form>
  </div>
</template>
