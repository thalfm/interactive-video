<?php declare(strict_types=1);

namespace App\Http\Requests\API;

use App\Models\Curso;
use InfyOm\Generator\Request\APIRequest;

class CreateVideosPerguntasRequest  extends APIRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [];
    }
}
