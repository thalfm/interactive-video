<?php declare(strict_types=1);

namespace App\Http\Requests\API;

use App\Models\Video;
use InfyOm\Generator\Request\APIRequest;

class UpdateVideoAPIRequest extends APIRequest
{
    /**
     * Determine if the user is authorized to make this request.
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     * @return array
     */
    public function rules()
    {
        $rules = Video::$rules;

        if ($this->get('_method') == 'PUT') {
            $rules = [
                'id_video'   => 'required',
                'nome_video' => 'required'
            ];
        }

        return $rules;
    }
}
